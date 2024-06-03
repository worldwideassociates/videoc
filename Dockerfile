FROM node:20-alpine as base

RUN apk add --no-cache --virtual .build-deps curl \
  && curl -f https://get.pnpm.io/v6.js | node - add --global pnpm \
  && apk del .build-deps

FROM base as builder

WORKDIR /home/node/app
COPY pnpm-lock.yaml ./
COPY package*.json ./

COPY . .
RUN pnpm install

RUN npx prisma generate

RUN pnpm build

FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node/app
COPY pnpm-lock.yaml ./
COPY package*.json ./

RUN pnpm install --production
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public

RUN npx prisma generate

EXPOSE 3000

CMD ["npx", "next", "start"]