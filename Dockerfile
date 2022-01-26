FROM node:16-alpine as dist
LABEL stage=builder
WORKDIR var/www/
COPY . .
RUN yarn install --network-timeout 6000000 && yarn build

FROM node:16-alpine as runner
ENV NODE_ENV production
WORKDIR var/www/
COPY package.json .
COPY yarn.lock .
RUN yarn install --prod --network-timeout 6000000 --frozen-lockfile && yarn autoclean
COPY --from=dist /var/www/dist .
CMD ["node", "server.js"]
