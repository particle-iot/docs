const redirects = {
    "360044252594": "https://docs.particle.io/reference/discontinued/hardware/xenon-nordic-sdk/",
    "360046862953": "https://docs.particle.io/hardware/expansion/create-a-custom-cold-chain-solution-using-gen3-devices-and-ble/",
    "360039735733": "https://docs.particle.io/troubleshooting/guides/device-management/finding-your-device-id/",
    "360039741113": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/using-3rd-party-sim-cards/",
    "360039741113": "https://docs.particle.io/archives/mesh-setup-over-usb/",
    "360039251274": "https://docs.particle.io/archives/serial2-on-the-photon/",
    "360044183314": "https://docs.particle.io/archives/xenon-standalone/",
    "360044755894": "https://docs.particle.io/archives/create-a-local-publishsubscribe-group-using-ble-on-gen3-devices/",
    "360039741253": "https://docs.particle.io/archives/debugging-with-eclipse/",
    "360039251394": "https://docs.particle.io/archives/installing-dfu-util/",
    "360039741273": "https://docs.particle.io/archives/local-build-using-gcc-arm/",
    "1260802302149": "https://docs.particle.io/hardware/certification/enabling-wifi-rf-test-for-esp32/",
    "1260800691709": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/troubleshooting-wifi-on-the-particle-argon/",
    "1260800692169": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/troubleshooting-wifi-on-the-particle-photonp1/",
    "360052621274": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/wifi-connectivity-troubleshooting-guide/",
    "360044518213": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/cellular-connectivity-troubleshooting-guide/",
    "1260801313350": "https://docs.particle.io/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-the-particle-workbench/",
    "1260801311330": "https://docs.particle.io/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-the-particle-cli/",
    "1260801242950": "https://docs.particle.io/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-webhookintegration-issues/",
    "4412206822555": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/troubleshooting-asset-tracker-issues/",
    "1260801921089": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/troubleshooting-the-setup-process/",
    "1260801176309": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/identifying-damaged-hardware/",
    "360060114433": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/device-breathing-cyan-but-cannot-connect/",
    "360049403474": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/device-blinking-dark-blue/",
    "360046136473": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/device-blinking-red-yellow-or-frozenno-led/",
    "1260803794770": "https://docs.particle.io/scaling/best-practices/what-are-particles-best-practices-with-respect-to-device-os-version-management/",
    "360045359554": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/device-blinking-cyan/",
    "360039251434": "https://docs.particle.io/getting-started/developer-tools/workbench-faq/",
    "360039251374": "https://docs.particle.io/troubleshooting/guides/build-tools-troubleshooting/installing-curl-for-windows/",
    "360047299873": "https://docs.particle.io/scaling/best-practices/messaging-architecture-for-scale/",
    "360059764393": "https://docs.particle.io/troubleshooting/guides/device-management/repairing-product-device-keys/",
    "360045547634": "https://docs.particle.io/troubleshooting/guides/device-management/how-can-i-set-up-my-argon-or-boron-via-usb/",
    "360057772154": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/using-particle-serial-inspect/",
    "360039251414": "https://docs.particle.io/reference/developer-tools/jtag/",
    "4401990491675": "https://docs.particle.io/troubleshooting/faqs/orders/where-can-i-find-information-about-the-status-of-my-order/",
    "360043388794": "https://docs.particle.io/troubleshooting/faqs/orders/standard-manufacturing-lead-times/",
    "360043575753": "https://docs.particle.io/troubleshooting/faqs/orders/can-i-update-my-order-once-it-has-been-placed/",
    "360041087033": "https://docs.particle.io/troubleshooting/faqs/orders/what-is-particles-return-refund-policy/",
    "360040604194": "https://docs.particle.io/troubleshooting/faqs/orders/what-payment-methods-can-i-use-at-checkout/",
    "360041079913": "https://docs.particle.io/troubleshooting/faqs/orders/how-do-i-add-my-vat-information-to-my-wholesale-order/",
    "360039741373": "https://docs.particle.io/troubleshooting/faqs/orders/why-cant-i-log-into-my-wholesale-store-account/",
    "360039251694": "https://docs.particle.io/troubleshooting/faqs/orders/how-do-i-sign-up-for-or-log-into-the-wholesale-store/",
    "360045170254": "https://docs.particle.io/troubleshooting/faqs/shipping/what-shipping-options-does-particle-offer/",
    "360044781654": "https://docs.particle.io/troubleshooting/faqs/shipping/if-my-order-is-shipping-to-a-country-outside-of-the-united-states-what-do-i-need-to-know/",
    "4589957939611": "https://docs.particle.io/reference/product-lifecycle/supply-secure-faq/",
    "360041079253": "https://docs.particle.io/troubleshooting/faqs/orders/wholesale-store-user-compliance-survey/",
    "360039741073": "https://docs.particle.io/troubleshooting/faqs/general-knowledge/pricing-faq/",
    "1260803323450": "https://docs.particle.io/troubleshooting/faqs/general-knowledge/pricing-faq/",
    "360047499873": "https://docs.particle.io/reference/product-lifecycle/long-term-support-lts-releases/",
    "360046927733": "https://docs.particle.io/troubleshooting/faqs/general-knowledge/particle-mvp-program/",
    "360045935173": "https://docs.particle.io/troubleshooting/faqs/general-knowledge/what-should-i-do-if-im-locked-out-via-2fa/",
    "360045377794": "https://docs.particle.io/troubleshooting/faqs/general-knowledge/how-should-i-set-up-2fa-for-my-particle-account/",
    "360044034634": "https://docs.particle.io/troubleshooting/faqs/general-knowledge/account-management-faq-2fa-account-deletion-changing-your-particle-id/",
    "360044518993": "https://docs.particle.io/troubleshooting/faqs/general-knowledge/how-can-i-cancel-billing/",
    "360043698974": "https://docs.particle.io/troubleshooting/faqs/orders/how-do-i-make-a-tax-exempt-purchase/",
    "360052556854": "https://docs.particle.io/reference/technical-advisory-notices/tan001-sara-r410m-124-day/",
    "360052713714": "https://docs.particle.io/reference/technical-advisory-notices/tan002-tracker-one-v10-shipping-mode/",
    "1260801078410": "https://docs.particle.io/reference/technical-advisory-notices/tan003-b402-rf-circuit-component/",
    "1260802113569": "https://docs.particle.io/reference/technical-advisory-notices/tan004-power-off-recommendations-for-sara-r410m-equipped-devices/",
    "4407211331739": "https://docs.particle.io/reference/technical-advisory-notices/tan005-sara-r410-02b-03/",
    "4412220540571": "https://docs.particle.io/reference/technical-advisory-notices/tan006-tracker-som-gnss-interface/",
    "4596391852443": "https://docs.particle.io/reference/product-lifecycle/notices/product-deprecation-notice-march-16-2022/",
    "360049388173": "https://docs.particle.io/reference/product-lifecycle/product-lifecycle-policy-status/",
    "360039251234": "https://docs.particle.io/reference/product-lifecycle/product-lifecycle-stages/",
    "360050288874": "https://docs.particle.io/reference/errata/tracker/",
    "360047803973": "https://docs.particle.io/scaling/quick-start-guide/enterprise-order-placement/",
    "360046222894": "https://docs.particle.io/scaling/quick-start-guide/tools-overview/",
    "360046225274": "https://docs.particle.io/scaling/quick-start-guide/device-communication/",
};