---
title: Github actions (CI/CD)
columns: two
layout: commonTwo.hbs
description: Github actions (CI/CD)
---

# {{title}}

## Background

### About CI/CD

Continuous Integration and Continuous Deployment (CI/CD) are crucial practices in modern software development that facilitate faster and more reliable product delivery. They offer numerous benefits that are highly valued by developers:

- Improved code quality: CI/CD practices encourage developers to write clean, modular code that is easy to maintain and understand. Automated testing, as part of CI, detects bugs and other issues early in the development process, ensuring that the code base remains stable and reliable.
- Faster release cycles: CI/CD automates the process of building, testing, and deploying software, allowing developers to push updates and new features to production more quickly. This results in a more efficient development process and faster time-to-market for new products and features.
- Reduced risk: By continuously integrating and deploying code, developers can identify and fix issues as soon as they arise, reducing the risk of major problems down the line. This also enables the team to respond quickly to security vulnerabilities and other critical concerns.
- Better collaboration: CI/CD practices encourage cross-functional collaboration, as they require teams to work together to create, test, and deploy code. This fosters better communication, shared responsibility, and faster problem-solving.
- Increased transparency: CI/CD pipelines provide clear visibility into the status of code changes and deployments, allowing stakeholders to monitor progress and make informed decisions.
- Scalability: CI/CD pipelines can be easily scaled to accommodate growing teams and codebases, ensuring that the development process remains smooth and efficient as the organization expands.

### Github actions

[GitHub Actions](https://docs.github.com/en/actions) is a platform that enables developers to automate their software workflows. It allows developers to create custom actions, which are reusable units of code that can be combined to create workflows. These workflows can then be triggered by various events, such as a code push or a pull request.

### CI/CD for Particle firmware development

There are two types of functions in managing firmware development and deployment:

1. Pull Request (PR) pipeline: This pipeline is triggered when a developer creates a pull request for their changes. The pipeline performs the following tasks:
    
    a. Building: It compiles the firmware with the proposed changes, ensuring that the code changes do not introduce build errors.
    
    b. Testing: The pipeline runs a suite of automated tests to validate that the new changes do not break existing functionality or introduce new issues.
    
    c. Installation (optional): In some cases, the pipeline may also install the firmware onto a device to check that it functions correctly in a real-world environment. This step can be crucial in catching hardware-specific issues that might not be apparent during the build or testing phases.
    
2. Landing pipeline: This pipeline is triggered when a pull request is merged into the main branch. It performs the following tasks:
    
    a. Building: It compiles the firmware with the merged changes, ensuring that the main branch remains in a buildable state.
    
    b. Revisioning: The pipeline automatically increments the firmware version number, creating a new official version of the firmware that reflects the latest changes.
    
    c. Uploading to Particle Platform: The new firmware version is uploaded to the Particle platform as an Over-the-Air (OTA) target. This enables customers to easily update their devices with the latest firmware without the need for manual intervention.
    

The following actions that interact with the Particle platform are used to implement these common pipelines.

- Compilation (with specified firmware revision that might auto increment)
- Firmware Installation - single device OTA flashing and boot validation
 Product firmware upload - upload a binary to a product to allow automated flashing to all or a subset of a product fleet

{{!-- 
Outside of this, we can attach additional process steps to the above pipelines including:

- Unit testing frameworks
- Artifact/Release storage (nominally supported by GitHub, but might benefit from some tagging with regards to the particle released firmware version)

An additional action for releasing firmware could exist in the future. More research is needed in this space. 
--}}

### Implementation

The implementation of this feature is broken down in to several high level buckets that can be rolled out incrementally to provide the most value up front followed by incremental value / improvements over time.

1. Polish the [Compile Action](https://www.notion.so/GitHub-Action-Compile-42cc32ed49534af9bb939ce737cdee5e) for external stable release
    - Publish to GitHub Action Marketplace
    - [Documentation on how to utilize this](https://www.notion.so/GitHub-Action-Compile-42cc32ed49534af9bb939ce737cdee5e)
2. Creation and publication of the Particle Firmware Installation and OTA Target Upload GitHub actions
    - Documentation is improved to provide guidance on the 2 mains types of CI/CD flow that Particle supports and how to configure GitHub to provide auto incrementing versions and artifact storage of the built binaries
    - Developer outreach / marketing
3. Documentation and examples for testing Particle application firmware
    1. Common unit testing frameworks customers can use with firmware applications 
        1. reassess [test demo](https://github.com/particle-iot-inc/device-os-unit-test-dem), [test runner](https://github.com/particle-iot/device-os-test-runner) projects: are these the right tools customers should use?
        2. Tools or documentation to mock Particle interfaces (i.e. Device OS mocks) in unit test frameworks
    2. How to automate your running the tests in CI/CD pipelines
    3. How to add tests to existing firmware applications
    4. (if needed) why testing is important documentation
4. Updating of the Particle CLI and Workbench “create project” helper function to automatically create the .github folder and pre-populate with the CI/CD pipeline as implemented by Particle
    - Additional command added in to add in the CI/CD feature set to existing projects?

## Setup

### Obtain an access token

We recommend using an access token for your product that has limited capabilities using the API Users feature. The [API users tool](https://docs.particle.io/getting-started/cloud/cloud-api/#api-users) allows you to easily create an access token.

TODO: insert screenshot here

In this example, most of the **firmware** options are enabled along with **devices: update** which is needed to flash firmware. You do not need to add a specific role to compile source code. 

Make sure you save the token in a secure location as you won't be able to download it again after you leave this page. Likewise, since it grants access to your account you should keep it secure and never commit it to a public source repository. 

### Add to Github secrets

Settings - Security - Secrets and variables - Actions

`PARTICLE_ACCESS_TOKEN`

### Documentation Required

We can document the GitHub firmware CI/CD tools in a couple places. We will want at least a mention and link somewhere in a Getting Started section and an Enterprise Best Practices section.

Proposed information for GitHub Actions for firmware application development:

1. Introduction
    - Brief overview of Particle's GitHub Actions and their benefits
        - Particle's GitHub Actions streamline the development process for firmware applications by offering seamless integration with Particle's IoT platform, enabling features like automated builds, testing, versioning, and uploading firmware artifacts.
        - Incorporating CI/CD into an embedded firmware development workflow fosters a culture of shared responsibility, encouraging developers to proactively address potential issues and collaborate effectively.
        - By automating repetitive tasks and tests, CI/CD minimizes human error and ensures the delivery of consistently high-quality firmware.
        - CI/CD promotes adaptability in development, enabling teams to rapidly respond to changing requirements or technology advancements, keeping their projects on the cutting edge.
    - Explanation of what GitHub Actions are and how they work
        - [GitHub Actions](https://docs.github.com/en/actions) is a powerful automation platform integrated within GitHub, enabling developers to create custom workflows for various tasks such as building, testing, and deploying code directly from their repositories.
        - These workflows consist of a series of steps, with each step representing an individual action.
        - To create a workflow, developers define a YAML file in the **`.github/workflows`**
         directory of their repository. This file specifies the events that trigger the workflow, the sequence of actions to be executed, and any required environment variables or secrets.
        - When an event specified in the YAML file occurs, GitHub spins up a virtual environment called a "runner" to execute the actions within the workflow. Runners can be hosted by GitHub or self-hosted, providing flexibility in choosing the execution environment.
        - Self-hosted runners provide an advantage for testing firmware, as they allow developers to directly attach test devices to the runner and communicate with them over USB during the execution of a GitHub Actions pipeline.
        - This connectivity enables automated firmware flashing, testing, and validation on real hardware, resulting in a more comprehensive and accurate assessment of the firmware's performance and compatibility with target devices.
2. Prerequisites
    - List of prerequisites needed to use Particle's GitHub Actions
        - Particle
            - account
            - device
            - project
            - API token (see section below for more details)
        - GitHub
            - Repository: Set up a GitHub repository to host your Particle project and store your code, workflows, and related files.
            - GitHub Actions access: Make sure that your GitHub account has access to GitHub Actions; it is generally available to all users, but double-check if you're using an organization account or have specific access limitations.
    - Information on how to organize Particle devices and accounts
        - *For new projects, individual developers, and non-production projects*
            - Particle Product & Device Groups: Organize your devices within a single Particle product using device groups.
                - Development Device Feature: Utilize the "development device" feature within a Particle product, marking one or more devices as development devices. This enables you to flash and test firmware on designated development devices without affecting the rest of the devices in the group.
                - ~~Assign devices to specific device groups based on their development stage (e.g., development, testing, or production). This setup provides a flexible way to manage firmware deployment and updates.~~
            - Feature Branches & Pull Requests: Encourage the use of feature branches for each new feature or bug fix. This approach ensures that code changes are isolated and can be reviewed, tested, and merged independently without affecting the main branch
            - GitHub Actions Workflow: Set up a single GitHub Actions workflow to handle building, testing, and upload tasks. Configure the workflow to trigger on specific events such as creating pull requests, pushing new commits to feature branches, or merging into the main branch.
        - *For established projects, organizations, and teams with production products (”Enterprise best practices”)*
            - Use separate Particle accounts: Create separate Particle organizations for development and production environments. This approach helps isolate each stage and minimize the risk of accidental changes or deployments affecting other stages.
            - Organize devices into Particle products: For each environment, create a corresponding Particle product and add the associated devices under that product. This strategy allows you to manage firmware uploads and updates more effectively within each environment.
                - Example:
                    - Acme Corp Development [org]
                        - Electric roller skates dev (10 devices) [product]
                    - Acme Corp Production [org]
                        - Electric roller skates V1 (2,000 devices) [product]
            - Use environment-specific Particle API keys: Generate separate Particle API keys for each environment's Particle account. This approach maintains a clear separation between environments and ensures that GitHub Actions workflows only interact with the intended Particle devices and products.
                - *Bonus points: integrating GitHub Environments:*
                    - [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) is a feature that allows you to define and manage various stages of your deployment process, such as development, testing, and production
                    - They provide granular control over deployments, including access restrictions and required approvals, ensuring a secure and organized release workflow.
                    - GitHub Environments work with secrets and variables by allowing you to store **environment-specific secrets and variables** that can be accessed during GitHub Actions workflows.
                    - These environment-specific secrets provide a secure way to store sensitive information or configuration settings and make them available to your workflows based on the defined environment, ensuring that the correct settings  and credentials are used for each stage of your deployment process.
            - Implement review and approval processes: Establish a code review and approval process before merging changes from one branch or Pull Request to the main branch. This practice helps maintain code quality and ensures that only tested and reviewed changes make their way into the production environment.
        - API Tokens guidance in CI/CD context
            - Use GitHub Secrets: Store the Particle API token as a secret on your GitHub repository or organization to keep it secure. GitHub Secrets encrypts the token, ensuring it's not exposed in logs or accessible by unauthorized users. Do not commit secrets in a file checked into version control.
            - Limit token scope: When generating a Particle API token, ensure that its scope is limited to the minimum required permissions for your CI/CD pipeline.


## Examples


### Compile action

Using the [compile action](https://github.com/particle-iot/compile-action) can be used to create firmware binaries from source code pushed to Github. This also serves to validate that code committed to Github can be compiled successfully, and a compile error will show up on your Github repository page, and an email will typically be generated as well.

You Github action uses a runner, a virtual machine that runs the workflow. This can either be a Github hosted runner, or a self-hosted runner. Even in the free Github tier, minutes of Github runner are available to run your actions, currently 2000 minutes per month.

If you are using the Github hosted runner, you don't need to configure anything else in your account; it's enabled by default.

If you are using a self-hosted runner, follow the [Github instructions for self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners).

For compiling code, you can either do the build in the Github runner itself, using the Particle buildpack, or build using the Particle cloud compilers. Using the cloud compiler may make sense for free-tier runners as it will take an additional 30 to 60 seconds to set up and run the buildpack used to compile the code within the runner.

When using the Particle cloud compiler, a Particle access token is required, typically stored in Github secrets. Your compile.yaml file only includes the secret name, not the actual access token, so you can use this securely even on public repositories. Additionally, a API user who has few other privileges can be used to minimize the danger even if your account secret is exposed.

To set up a compile action, create a `.github` directory at the top of your repository. In that, create a `workflows` directory.

This example uses this file, `.github/workflows/compile.yaml`. The filename does not need to be `compile` but it does need to be a `.yaml` file.


```yaml
name: Compile Firmware

on: [push]

jobs:
  compile:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Compile application
        id: compile
        uses: particle-iot/compile-action@main
        with:
          particle-platform-name: 'boron'
          sources-folder: '.'
          particle-access-token: ${{ secrets.PARTICLE_ACCESS_TOKEN }}

      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: firmware-artifact
          path: ${{ steps.compile.outputs.artifact-path }}

```

- Be careful when copying and editing the file as leading spaces are very significant in yaml files!
- The `uses: actions/checkout@v3` command uses the built-in Github actions step for checking out the code from Github. It will automatically use the correct code for the branch you have committed the change to.
- The `uses: particle-iot/compile-action@main` command uses the Particle compile action. It automatically retrieves it from the [particle-iot](https://github.com/particle-iot/) Github account in the [compile-action](https://github.com/particle-iot/compile-action) repository. This example uses the latest in the `main` branch, but you make prefer to use a specific version such as `particle-iot/compile-action@v1`.
- `particle-platform-name: 'boron'` should be updated to specify the platform you want to build for, such as `boron`, `bsom`, `b5som`, etc.
- The `sources-folder` is typically `.` which means the top of the repository. This is often the directory containing the `project.properties` file.
- The `particle-access-token` is specified when using the Particle cloud compiler to compile your binary. It can be an API user token, and all valid API user tokens can compile, a specific scope does not need to be added.
- The Upload artifact saves the firmware binary so it can be downloaded from the Github actions tab of your repository.

Once you've writen your .yaml file:
                
- Commit and push the **`compile.yml`** file to your repository.
- The GitHub Actions workflow will automatically start compiling your firmware upon each push to the repository.
- Once the compile job is completed, the compiled binary will be uploaded as an artifact in the GitHub Actions run. You can download it from the **Artifacts** section of the completed workflow run. 

### Flash action


### Automatic versioning


### Upload to product

        - Examples of common use cases
            - Basic use: [https://github.com/particle-iot/compile-action#example-pipeline](https://github.com/particle-iot/compile-action#example-pipeline)
            - With auto-versioning for product firmware: [https://github.com/particle-iot/compile-action/blob/main/AUTO_VERSION.md#example-workflows](https://github.com/particle-iot/compile-action/blob/main/AUTO_VERSION.md#example-workflows)
    - Flash Action
        - Explanation
            - The Device Flash Action flashes firmware built in CI to a test device
        - Example use
            
```yaml
name: CI

on: [push]

jobs:
  compile:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Compile application
        id: compile
        uses: particle-iot/compile-action@v1
        with:
          particle-platform-name: 'boron'
          sources-folder: '.'

      - name: Flash development device
        uses: particle-iot/flash-device-action@v1
        with:
          particle-access-token: ${{ secrets.PARTICLE_ACCESS_TOKEN }}
          device-id: 'e00fce68ae40841234567890'
          firmware-path: ${{ steps.compile.outputs.artifact-path }}

      - name: Upload artifact to GitHub
        uses: actions/upload-artifact@v3
        with:
          name: firmware
          path: ${{ steps.compile.outputs.artifact-path }}
```
            
    - Upload Action
        - Explanation
            - The Firmware Upload Action uploads firmware built in CI to a product
            - It does not release the firmware to any devices (i.e. no OTAs happen)
        - Example use
            
```yaml
name: Tracker CI

on: [push]

jobs:
  compile:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Compile application
        id: compile
        uses: particle-iot/compile-action@v1
        with:
          particle-platform-name: 'boron'
          sources-folder: '.'

      - name: Flash development device
        uses: particle-iot/flash-device-action@v1
        with:
          particle-access-token: ${{ secrets.PARTICLE_ACCESS_TOKEN }}
          device-id: 'e00fce68ae40841234567890'
          firmware-path: ${{ steps.compile.outputs.artifact-path }}

			- name: Upload firmware to Particle product
				uses: particle-iot/firmware-upload-action@v1
				with:
				  particle-access-token: ${{ secrets.PARTICLE_ACCESS_TOKEN }}
	        product-id: 10000
					version: ${{ steps.compile.outputs.firmware-version }}
          binary: ${{ steps.compile.outputs.artifact-path }}
          description: ""
          title: "title"

      - name: Upload artifact to GitHub
        uses: actions/upload-artifact@v3
        with:
          name: firmware
          path: ${{ steps.compile.outputs.artifact-path }}
```
            


## Additional resources

- [GitHub Actions documentation](https://docs.github.com/en/actions/)
- [Getting started with GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions/)
- [GitHub Actions documentation on configuring action triggers](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows/)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Particle community forum](https://community.particle.io/)