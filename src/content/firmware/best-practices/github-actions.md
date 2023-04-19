---
title: Github Actions (CI/CD)
columns: two
layout: commonTwo.hbs
description: Github Actions (CI/CD)
---

# {{title}}

Using Continuous Integration and Continuous Deployment (CI/CD) can both simplify firmware development and make it more robust.

- Improved code quality: CI/CD practices encourage developers to write clean, modular code that is easy to maintain and understand. Automated testing, as part of CI, detects bugs and other issues early in the development process, ensuring that the code base remains stable and reliable.
- Faster release cycles: CI/CD automates the process of building, testing, and deploying software, allowing developers to push updates and new features to production more quickly. This results in a more efficient development process and faster time-to-market for new products and features.
- Reduced risk: By continuously integrating and deploying code, developers can identify and fix issues as soon as they arise, reducing the risk of major problems down the line. This also enables the team to respond quickly to security vulnerabilities and other critical concerns.
- Better collaboration: CI/CD practices encourage cross-functional collaboration, as they require teams to work together to create, test, and deploy code. This fosters better communication, shared responsibility, and faster problem-solving.
- Increased transparency: CI/CD pipelines provide clear visibility into the status of code changes and deployments, allowing stakeholders to monitor progress and make informed decisions.
- Scalability: CI/CD pipelines can be easily scaled to accommodate growing teams and codebases, ensuring that the development process remains smooth and efficient as the organization expands.


[GitHub Actions](https://docs.github.com/en/actions) is a platform that enables developers to automate their software workflows. It allows developers to create custom actions, which are reusable units of code that can be combined to create workflows. These workflows can then be triggered by various events, such as a code push or a pull request.

**CI/CD Specifically for Particle Firmware Development**

When implementing CI/CD for Particle firmware, customers generally execute two types of functions to manage their firmware development and deployment:

1. Pull Request (PR) pipeline: This pipeline is triggered when a developer creates a pull request for their changes. The pipeline performs the following tasks:
    
    a. Building: It compiles the firmware with the proposed changes, ensuring that the code changes do not introduce build errors.
    
    b. Testing: The pipeline runs a suite of automated tests to validate that the new changes do not break existing functionality or introduce new issues.
    
    c. Installation (optional): In some cases, the pipeline may also install the firmware onto a device to check that it functions correctly in a real-world environment. This step can be crucial in catching hardware-specific issues that might not be apparent during the build or testing phases.
    
2. Landing pipeline: This pipeline is triggered when a pull request is merged into the main branch. It performs the following tasks:
    
    a. Building: It compiles the firmware with the merged changes, ensuring that the main branch remains in a buildable state.
    
    b. Revisioning: The pipeline automatically increments the firmware version number, creating a new official version of the firmware that reflects the latest changes.
    
    c. Uploading to Particle Platform: The new firmware version is uploaded to the Particle platform as an Over-the-Air (OTA) target. This enables customers to easily update their devices with the latest firmware without the need for manual intervention.
    

Accordingly, our CI/CD pipeline is broken down into a series of actions:

1. Compilation (with specified firmware revision that might auto increment)
2. Firmware Installation - Single Device OTA Downloading and Boot Validation
3. OTA Target Uploading - Uploading newly built firmware to the Particle Platform as an OTA target

Names for the above Actions may be `compile`, `flash`, `upload`

Outside of this, we can attach additional process steps to the above pipelines including:

- Unit testing frameworks
- Artifact/Release storage (nominally supported by GitHub, but might benefit from some tagging with regards to the particle released firmware version)

An additional action for releasing firmware could exist in the future. More research is needed in this space. 


---

Original Notion Page (exported) - Copy and paste from here and delete when done


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
                    - Acme Corp Development
                        - Electric roller skates dev (10 devices)
                    - Acme Corp Production
                        - Electric roller skates V1 (2,000 devices)
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
3. Using Particle's GitHub Actions
    - Compile Action
        - Explanation of what the Compile Action does
            - Particle Compile Action is a GitHub Action that compiles Particle application firmware for various platforms.
            - It supports local compilation using Buildpack Docker images and cloud compilation by providing a Particle access token
            - The action also includes an optional automatic product firmware versioning feature, which allows for consistent and automated management of version numbers
        - Step-by-step instructions on how to use the Compile Action
            1. Create a new file called **`.github/workflows/compile.yml`** in your Particle project repository.
            2. Add the following content to the **`compile.yml`** file:
                
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
                          particle-platform-name: '<your-platform-name>'
                          sources-folder: '<your-sources-folder>'
                
                      - name: Upload artifact
                        uses: actions/upload-artifact@v3
                        with:
                          name: firmware-artifact
                          path: ${{ steps.compile.outputs.artifact-path }}
                
                ```
                
                Replace **`<your-platform-name>`** with the name of your target Particle platform (e.g., 'boron'). Replace **`<your-sources-folder>`** with the path to the directory containing your firmware source code (e.g., 'src').
                
            3. Commit and push the **`compile.yml`** file to your repository.
            4. The GitHub Actions workflow will automatically start compiling your firmware upon each push to the repository.
            5. Once the compile job is completed, the compiled binary will be uploaded as an artifact in the GitHub Actions run. You can download it from the "Artifacts" section of the completed workflow run.
        - Examples of common use cases
            - Basic use: [https://github.com/particle-iot/compile-action#example-pipeline](https://github.com/particle-iot/compile-action#example-pipeline)
            - With auto-versioning for product firmware: [https://github.com/particle-iot/compile-action/blob/main/AUTO_VERSION.md#example-workflows](https://github.com/particle-iot/compile-action/blob/main/AUTO_VERSION.md#example-workflows)
    - Flash Action
        - same (ish)
        - details forthcoming, thing is getting developed now
    - Upload Action
        - same (ish)
        - details forthcoming, thing does not exist yet
4. Troubleshooting
    - Common issues that customers may encounter when using Particle's GitHub Actions
    - Solutions to those issues
5. Resources
    - Links to relevant documentation, tutorials, and other resources that can help customers learn more about Particle's GitHub Actions
        - GitHub Actions documentation: [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
        - Getting started with GitHub Actions: [https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions](https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions)
        - GitHub Actions documentation on configuring action triggers: [https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
        - GitHub Actions Marketplace: [https://github.com/marketplace?type=actions](https://github.com/marketplace?type=actions)
    - Community forum or support channels where customers can ask questions or seek help.

### Side Benefits

The GitHub Actions as proposed here all utilize the Particle Compile API to perform the compilation and binary generation.

In increasing the use of this API, can get more visibility into our customers firmware. As such, we can expand the compile service to gather metrics on our customers firmware that include:

- Platform targets
- Code size
- APIs utilized
- Which third party libraries were included in their project

