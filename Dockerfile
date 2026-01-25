FROM node:22-bookworm-slim AS build
WORKDIR /usr/src/app

# https://pnpm.io/installation#using-corepack
# https://pnpm.io/docker
# https://pnpm.io/cli/fetch#usage-scenario

# TODO should prob copy & utilize package.json so that pnpm can install itself in the correct version instead of latest ?
# https://pnpm.io/settings#managepackagemanagerversions
#  in package.json
#  },
#   "packageManager": "pnpm@10.24.0"
# }

RUN corepack enable pnpm && corepack install -g pnpm@latest-10
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# If you patched any package, include patches before running pnpm fetch
# COPY patches patches

RUN pnpm fetch

COPY . ./
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE
ARG VITE_API
ARG VITE_USE_S3_TO_DOWNLOAD_TRACK
RUN echo "VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN" > .env && \
    echo "VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID" >> .env && \
    echo "VITE_AUTH0_AUDIENCE=$VITE_AUTH0_AUDIENCE" >> .env && \
    echo "VITE_API=$VITE_API" >> .env && \
    echo "VITE_USE_S3_TO_DOWNLOAD_TRACK=$VITE_USE_S3_TO_DOWNLOAD_TRACK" >> .env

RUN pnpm config list
RUN pnpm install --recursive --offline
RUN pnpm run build

# TODO fix major ver of nginx.. and also of redis stack in nest app.
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]