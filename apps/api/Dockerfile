FROM node:20-alpine AS base

# Builder
FROM base AS builder
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune api --docker
 
#  Installer
FROM base AS installer
RUN apk update
RUN apk add g++ make py3-pip
WORKDIR /app
 
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
RUN mv ./packages/database/.env.docker ./packages/database/.env
RUN yarn turbo db:generate
RUN yarn turbo build --filter=api

# Runner
FROM base AS runner
WORKDIR /app

COPY --from=installer /app .

ENTRYPOINT ["/bin/sh", "-c" , "yarn turbo db:push && yarn start"]
