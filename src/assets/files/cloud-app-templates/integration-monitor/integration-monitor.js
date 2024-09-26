/**
 * Main job function that monitors integrations for a product and sends alerts based on error rates.
 *
 * @param {Object} context - The job context provided by the Particle platform
 * @param {Object} metadata - The job metadata
 * @param {Object} Particle - The Particle API client module
 */
export function job(context, metadata, Particle) {
  log("Starting job() with", { context, metadata });

  const config = fetchAppConfig(metadata, Particle);

  for (const productId of config.monitoredProductIds) {
    const productName = friendlyProductName(productId, Particle);
    log(`Monitoring integrations for product ${productName}`);

    const previousState = fetchState(metadata, Particle, productId);
    const alertManager = new AlertManager({
      errorRateThreshold: config.alertConfig.errorRateThreshold,
      alertDelayMinutes: config.alertConfig.alertDelayMinutes,
      initialState: previousState,
    });

    const monitor = new IntegrationMonitor({
      Particle,
      productId,
      alertConfig: config.alertConfig,
      notificationConfig: config.notificationConfig,
      alertManager,
    });
    const newState = monitor.refresh();

    putState(metadata, Particle, productId, newState);
  }
}

/**
 * AlertManager class manages state for alerting based on error rates.
 *
 * @param {Object} options - The options for the alert manager.
 * @param {Number} options.errorRateThreshold - The error rate threshold that triggers an alert.
 * @param {Number} options.alertDelayMinutes - The duration in minutes that the error rate must be above the threshold to trigger an alert.
 * @param {Object} [options.initialState] - The initial state of the alert manager.
 */
export class AlertManager {
  constructor({ errorRateThreshold, alertDelayMinutes, initialState }) {
    this.errorRateThreshold = errorRateThreshold;
    this.alertDelayMinutes = alertDelayMinutes;

    if (initialState && Object.keys(initialState).length > 0) {
      this.load(initialState);
    } else {
      log("No initial state provided. Initializing to normal state.");
      this.state = "normal";
      this.lastValue = null;
      this.violationStartTime = null;
    }

    if (this.errorRateThreshold === undefined) {
      throw new Error("errorRateThreshold is required");
    }

    if (alertDelayMinutes === undefined) {
      throw new Error("alertDelayMinutes is required");
    }

    if (parseInt(alertDelayMinutes) <= 0) {
      throw new Error("alertDelayMinutes must be greater than 0");
    }

    this.violationDurationSeconds = alertDelayMinutes * 60;
  }

  load(state) {
    this.validate(state);

    this.state = state.state;
    this.lastValue = state.lastValue;
    this.violationStartTime = state.violationStartTime;
  }

  validate(state) {
    if (state.state !== "normal" && state.state !== "alert") {
      throw new Error("Invalid state. Must be 'normal' or 'alert'");
    }

    if (state.lastValue !== null && isNaN(state.lastValue)) {
      throw new Error("Invalid lastValue in state. Must be a number or null");
    }

    if (state.violationStartTime !== null && isNaN(state.violationStartTime)) {
      throw new Error(
        "Invalid violationStartTime in state. Must be a number or null",
      );
    }

    return true;
  }

  update(value, now = null) {
    if (value === null || value === undefined || isNaN(value)) {
      return this.state;
    }

    if (now === null) {
      now = Math.round(Date.now() / 1000);
    }
    const nowMs = now;
    value = Number(value);

    if (this.lastValue === null) {
      this.lastValue = value;
      return this.state;
    }

    if (this.state === "normal" && value >= this.errorRateThreshold) {
      if (this.violationStartTime === null) {
        this.violationStartTime = nowMs;
      }
      if (nowMs - this.violationStartTime >= this.violationDurationSeconds) {
        this.state = "alert";
      }
    } else if (this.state === "alert" && value < this.errorRateThreshold) {
      this.state = "normal";
      this.violationStartTime = null;
    } else if (value < this.errorRateThreshold) {
      this.violationStartTime = null;
    }

    this.lastValue = value;
    return this.state;
  }

  getState() {
    return {
      state: this.state,
      lastValue: this.lastValue,
      violationStartTime: this.violationStartTime,
    };
  }
}

/**
 * IntegrationMonitor class monitors integrations for a product and sends alerts based on error rates.
 *
 * @param {Object} options - The options for the integration monitor.
 * @param {Object} options.Particle - The Particle API client.
 * @param {Object} options.alertConfig - The config for the AlertManager class.
 * @param {Object} options.notificationConfig - The config for sending notifications.
 * @param {Number} options.productId - The product ID to monitor.
 */
export class IntegrationMonitor {
  constructor({
    Particle,
    productId,
    alertConfig,
    notificationConfig,
    alertManager,
  }) {
    this.Particle = Particle;
    this.productId = productId;
    this.alertConfig = alertConfig;
    this.notificationConfig = notificationConfig;
    this.alertManager = alertManager;
  }

  fetchLatestMetrics(productId) {
    const lookBackTimeMs = this.alertConfig.alertDelayMinutes * 60 * 1000;
    const lookBackTime = new Date(Date.now() - lookBackTimeMs);
    const response = this.Particle.integrationsMetrics(productId, {
      startDate: lookBackTime.toISOString(),
      bucketSize: 60,
    });

    return response?.body?.integrations;
  }

  fetchIntegrations(productId) {
    const response = this.Particle.listIntegrations(productId);
    return response?.body;
  }

  fetchIntegrationDetails(productId, integrationId) {
    const response = this.Particle.getIntegration(productId, integrationId);
    return response?.body;
  }

  filterProblematicIntegrations(integrations) {
    return integrations.filter((integration) => {
      const { todayCounters } = integration;
      return (
        todayCounters && todayCounters.error > 0 && todayCounters.success > 0
      );
    });
  }

  fetchProblematicIntegrations(productId) {
    const integrations = this.fetchIntegrations(productId);
    const problematicIntegrations =
      this.filterProblematicIntegrations(integrations);

    return problematicIntegrations.map(
      (integration) =>
        this.fetchIntegrationDetails(productId, integration.id).integration,
    );
  }

  createIntegrationListHtml(integrations) {
    return integrations
      .map((integration) => {
        const errorCount = integration.todayCounters.error;
        return `
      <p>
        <a href="https://console.particle.io/${this.productId}/integrations/${integration.id}">
         ${integration.name} (${errorCount} errors today)
        </a>
      </p>
    `;
      })
      .join("");
  }

  formatSendgridEvent(details) {
    const integrationList = this.createIntegrationListHtml(
      details.problemIntegrations,
    );

    const productName = friendlyProductName(this.productId, this.Particle);

    const emailBody = `
    <html>
      <body>
        <h1>Elevated Error Rates Detected</h1>
        <h2>Particle Product ${productName}</h2>
        <p>${this.generateSummary(details.previousState, details.nextState, details.errorRate)}</p>
        <p><a href="https://console.particle.io/${this.productId}/fleet-health">View Fleet Health</a></p><br>
        ${details.problemIntegrations.length > 0 ? `<h3>Integrations with errors today</h3>${integrationList}` : ""}
      </body>
    </html>
  `;

    const validEmails = this.notificationConfig.sendgrid.toEmails.filter(
      (email) => typeof email === "string" && email.includes("@"),
    );

    let payload = null;
    if (validEmails.length > 0) {
      payload = {
        personalizations: [
          {
            to: validEmails.map((email) => ({ email })),
          },
        ],
        from: {
          email: this.notificationConfig.sendgrid.fromEmail,
        },
        subject: `${details.stateName}: Elevated Error Rates Detected in Particle Integrations`,
        content: [
          {
            type: "text/html",
            value: emailBody,
          },
        ],
      };
    } else {
      log("WARNING: No valid emails found in configuration.", {
        emails: this.notificationConfig.sendgrid.toEmails,
      });
    }

    return payload;
  }

  formatSlackEvent(details) {
    const integrationList = details.problemIntegrations
      .map((integration) => {
        const errorCount = integration.todayCounters.error;
        return `• <https://console.particle.io/${this.productId}/integrations/${integration.id}|${integration.name}> (${errorCount} errors today)`;
      })
      .join("\n");

    const productName = friendlyProductName(this.productId, this.Particle);

    return {
      text: "",
      attachments: [
        {
          color: details.nextState === "alert" ? "#FF0000" : "#36A64F",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*${details.stateName} for Particle Product ${productName}*\nElevated error rates detected. Review the integrations below and take action if necessary.`,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Integrations with Errors Today*\n${integrationList}`,
              },
            },
            {
              type: "divider",
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: `*Aggregate Error Rate*\n${details.errorRate.toFixed(2)}%`,
                },
                {
                  type: "mrkdwn",
                  text: `*Threshold*\n${this.alertConfig.errorRateThreshold}%`,
                },
                {
                  type: "mrkdwn",
                  text: `*Duration*\n${this.alertConfig.alertDelayMinutes} minutes`,
                },
                {
                  type: "mrkdwn",
                  text: `*State*\n${details.nextState}`,
                },
              ],
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "View Fleet Health",
                    emoji: true,
                  },
                  url: `https://console.particle.io/${this.productId}/fleet-health`,
                  style: "primary",
                },
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "View All Integrations",
                    emoji: true,
                  },
                  url: `https://console.particle.io/${this.productId}/integrations`,
                },
              ],
            },
          ],
        },
      ],
    };
  }

  formatPagerDutyEvent(details) {
    const impactedIntegrations = details.problemIntegrations
      .map((integration) => {
        const errorCount = integration.todayCounters.error;
        return `${integration.name} (${errorCount} errors) - https://console.particle.io/${this.productId}/integrations/${integration.id}`;
      })
      .join("\n");

    const productName = friendlyProductName(this.productId, this.Particle);

    return {
      event_action: details.nextState === "alert" ? "trigger" : "resolve",
      payload: {
        summary: `Error Rate ${details.stateName} for Particle Product ${productName}`,
        severity: "critical",
        source: `Particle Product ${productName}`,
        component: "IntegrationMonitor",
        group: "Integrations",
        class: "ErrorRateAlert",
        custom_details: {
          error_rate: details.errorRate.toFixed(2),
          threshold: this.alertConfig.errorRateThreshold,
          duration: this.alertConfig.alertDelayMinutes,
          state: details.stateName,
          impacted_integrations: impactedIntegrations || "",
        },
      },
    };
  }

  generateSummary(previousState, nextState, errorRate) {
    let summary = "";
    if (nextState === "alert") {
      summary = `The integration error rate has exceeded the critical threshold of ${this.alertConfig.errorRateThreshold}% for at least ${this.alertConfig.alertDelayMinutes} minutes. The latest error rate is ${errorRate.toFixed(2)}%.`;
    } else {
      summary = `The integration error rate has recovered and is now below the critical threshold of ${this.alertConfig.errorRateThreshold}%. The latest error rate is ${errorRate.toFixed(2)}%.`;
    }
    return summary;
  }

  calculateErrorRate(data) {
    let totalRequests = 0;
    let failedRequests = 0;

    data.forEach((bucket) => {
      if (bucket.success) {
        totalRequests += bucket.success;
      }
      if (bucket.failure) {
        totalRequests += bucket.failure;
        failedRequests += bucket.failure;
      }
      if (bucket.sleep) {
        totalRequests += bucket.sleep;
        failedRequests += bucket.sleep;
      }
    });

    if (totalRequests === 0) {
      return 0;
    }

    return Math.round((failedRequests / totalRequests) * 100 * 100) / 100;
  }

  refresh() {
    const metrics = this.fetchLatestMetrics(this.productId);
    const errorRate = this.calculateErrorRate(metrics);
    const previousState = this.alertManager.getState().state;
    const nextState = this.alertManager.update(errorRate);

    log(
      `State: ${previousState} -> ${nextState} with error rate ${errorRate.toFixed(2)}%`,
    );
    if (previousState !== nextState) {
      this.handleStateChange(previousState, nextState, errorRate);
    }

    return this.alertManager.getState();
  }

  handleStateChange(previousState, nextState, errorRate) {
    let problemIntegrations = [];
    if (nextState === "alert") {
      problemIntegrations = this.fetchProblematicIntegrations(this.productId);
    }

    const stateName = nextState === "alert" ? "Triggered" : "Recovered";
    const details = {
      stateName,
      previousState,
      nextState,
      problemIntegrations,
      errorRate,
    };

    const channels = [
      { channel: "sendgrid", payload: this.formatSendgridEvent(details) },
      { channel: "slack", payload: this.formatSlackEvent(details) },
      { channel: "pagerduty", payload: this.formatPagerDutyEvent(details) },
    ];

    channels.forEach((message) => this.publishMessage(message));
  }

  publishMessage(message) {
    const conf = this.notificationConfig;

    if (message.channel === "sendgrid" && conf.sendgrid.enabled === true) {
      this.Particle.publish(conf.sendgrid.eventName, message.payload, {
        productId: parseInt(this.productId),
      });
    }

    if (message.channel === "slack" && conf.slack.enabled === true) {
      this.Particle.publish(conf.slack.eventName, message.payload, {
        productId: parseInt(this.productId),
      });
    }

    if (message.channel === "pagerduty" && conf.pagerduty.enabled === true) {
      if (message.payload.event_action === "resolve") {
        // We don't have a way to store the dedup key required for the resolve event
        return;
      }

      this.Particle.publish(conf.pagerduty.eventName, message.payload, {
        productId: parseInt(this.productId),
      });
    }
  }
}

function fetchAppConfig(metadata, Particle) {
  const configLedgerName = `${metadata.name}-config-v${metadata.version}`;
  const configLedger = Particle.ledger(configLedgerName);
  return configLedger.get().data;
}

function fetchState(metadata, Particle, productId) {
  const stateLedgerName = `${metadata.name}-state-v${metadata.version}`;
  const stateLedger = Particle.ledger(stateLedgerName, {
    productId: parseInt(productId),
    deviceId: null,
  });
  return stateLedger.get().data;
}

function putState(metadata, Particle, productId, state) {
  const stateLedgerName = `${metadata.name}-state-v${metadata.version}`;
  const stateLedger = Particle.ledger(stateLedgerName, {
    productId: parseInt(productId),
    deviceId: null,
  });
  stateLedger.set(state, Particle.REPLACE);
}

const productNames = [];

function friendlyProductName(productId, Particle) {
  if (!productNames[productId]) {
    const response = Particle.getProduct(productId);
    const product = response.body.product;
    productNames[productId] = product.name;
  }
  const name = productNames[productId];
  return `${name} (${productId})`;
}

function log(message, metadata = null) {
  // eslint-disable-next-line no-undef
  console.log(message, metadata);
}

async function getParticleModule() {
  try {
    const module = await import("Particle:core");
    return module.default;
  } catch (error) {
    throw new Error(
      "Failed to import Particle:core. Module is is not available in the current environment.",
      error,
    );
  }
}

export function withParticleModule(job, metadata, moduleLoader) {
  return async function (context) {
    const ParticleModule = await moduleLoader();
    await job(context, metadata, ParticleModule);
    log("Finished successfully");
  };
}

const metadata = {
  name: "integration-monitor",
  version: "1",
};
export default withParticleModule(job, metadata, getParticleModule);
