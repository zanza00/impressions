# Context for this dockerfile is the "api" dir
FROM node:12 as stage1

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --no-progress 

COPY . .
ENV NODE_ENV=production
RUN yarn build

RUN rm -rf node_modules
RUN yarn --prod --no-progress

FROM mhart/alpine-node:12

ENV NODE_ENV=production
WORKDIR /app

COPY --from=stage1 /app/build build
COPY --from=stage1 /app/package.json /app/yarn.lock ./
COPY --from=stage1 /app/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "/app/build"]
