# build environment
FROM node:12 as stage1

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --no-progress

COPY . /app
ENV NODE_ENV=production
RUN yarn build

RUN rm -rf node_modules
RUN yarn --prod --no-progress

# production environment
FROM nginx:1.16.0-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY --from=stage1 /app/build /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
