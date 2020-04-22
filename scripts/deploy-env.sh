#!/bin/bash


VAULT_ADDR=${VAULT_ADDR:-"https://vault.umusic.net"}

checkenv() {
  if [[ -z "$ENV" ]]; then
    echo ENV required
    exit 1
  fi
}

deployenv() {
  echo =======================
  echo Deploying $ENV
  echo =======================
  case "$e" in
    dev) export NODE_ENV=development;;
    prod) export NODE_ENV=production;;
    *) export NODE_ENV=$e;;
  esac

  VAULT_KV=umg-central
  VAULT_KV_PATH=umgc_delivery_server/$ENV
  
  VAULT_TOKEN=$(curl -s --request POST --data '{"password": "'${VAULT_PASS}'"}' ${VAULT_ADDR}/v1/auth/userpass/login/${VAULT_USER} | jq .auth.client_token | tr -d '",')
  
  export $(curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" -X GET $VAULT_ADDR/v1/${VAULT_KV}/data/${VAULT_KV_PATH} | jq -r '.data.data | to_entries|map("\(.key)=\(.value|tostring)")|.[]')
  
  if [[ -f override_env ]]; then
    export IFS=";"
    override_environment=$(<override_env)
    for env_value in $override_environment; do
      export $env_value
    done
  fi
 
  cp dist/config/index.$ENV.js dist/config/index.js
  node server.js | node gso-transport.js
}

main() {
  checkenv
  deployenv
}
main "$@"
