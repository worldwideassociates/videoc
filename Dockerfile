FROM node:20-alpine

RUN apk add --no-cache --virtual .build-deps curl \
  && curl -f https://get.pnpm.io/v6.js | node - add --global pnpm \
  && apk del .build-deps

WORKDIR /home/node/app
COPY pnpm-lock.yaml ./
COPY package*.json ./

COPY . .
RUN pnpm install

RUN npx prisma generate

RUN pnpm build

ENV NODE_ENV=production

RUN pnpm install --production

EXPOSE 3000

CMD ["npx", "next", "start"]