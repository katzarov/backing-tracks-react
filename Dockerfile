FROM node:20.11.1-bookworm-slim as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
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
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]