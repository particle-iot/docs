# Base image
FROM node:10.14.1-slim

# Setup Build Environment
ARG DEBIAN_FRONTEND=noninteractive

# Setup Environment
## (optional) speeds up the build if you don't need the search
ENV SEARCH_INDEX 0

# Install dependencies
RUN ["dash", "-c", "\
    apt-get update \
 && apt-get install --no-install-recommends -y \
      git \
 && rm -rf /var/lib/apt/lists/* \
"]

# Setup execution environment
WORKDIR /particle-iot/docs

# Execution Environment
ENTRYPOINT ["./scripts/particle-docs"]
