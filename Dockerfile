FROM node:12 as base
WORKDIR /src

ARG VAULT_ADDR
ARG VAULT_METHOD
ARG VAULT_USER
ARG VAULT_PASS

ENV VAULT_ADDR=$VAULT_ADDR
ENV VAULT_METHOD=$VAULT_METHOD
ENV VAULT_USER=$VAULT_USER
ENV VAULT_PASS=$VAULT_PASS

RUN apt-get update -y && apt-get install -y jq

COPY . .

RUN /src/scripts/build.sh

ENTRYPOINT ["/src/scripts/deploy-env.sh"]
