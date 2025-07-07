FROM node:22-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY RL-react/package*.json .

RUN pnpm install

COPY RL-react/ .

ENV VITE_API=/api

RUN pnpm build

FROM caddy:2.10.0-alpine

COPY --from=build /app/dist /srv

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]