# UMGC Delivery Project


The UMGC Delivery Project is a front-end application for the web to access the corporate intranet resources.

## How to use

- `npm run env` to set up the environment variales. You only need to run it when you need to update the .env file.
- `npm run start` to run the web server.
- `npm run test` to run all unit tests and linter.
- `npm run lint` to run the linter only.
- `npm run lint:fix` to reformat your code.
- `npm run start:docker` To run a containerized version. Always make sure this build passes before raising a PR. It includes tests, linter, and build as per what will be on prod.

## Set up your environment

(For windows see [Vault configuration for Windows](#vault-configuration-for-windows))

- Install vault. Download and run the script [found here](https://github.com/umg/umgcentral/blob/master/local/scripts/install-vault-darwin):

- Setup vault environment variables. Update your `.bashrc` or `.zshrc` with:

Ask someone for the script.

- Create Vault environment variables. Paste this into your `.bashrc` or `.zshrc`.

```
export VAULT_ADDR=https://vault.umusic.net
export ENV=local
export NODE_ENV=development
```

- Install the latest version of node and npm, if you don't have it already:

```
brew install n
n latest
```

- Connect to our node package repository. Use your standard network login.

```
npm config set registry https://artifactory.umusic.net/artifactory/api/npm/umg-npm/
npm login
```

- Install npq for better visibility:

```
npm i -g npq
```

(Then add alias to your preferred aliases file: `alias npm='npq-hero'`)

## Local Install

To setup this project, please clone this repository and follow these steps:

- Install the dependencies:

```
npm i
```

- Login to vault

```
vault login -method=ldap username=YOUR_NETWORKD_ID
```

- Vault issues

Sometimes the vault token could get corrupted. In one case it happened when updating vault version or updating the AD password.
The command to fix the issue:

```
rm ~/.vault-token
```

After that just attempt to login to vault again.

- Make sure that husky is installed from the root package.json and the pre-commit hook is setup properly. For that, just check that the `.git/hooks/pre-commit` file exists and it contains something like this:

```sh
#!/bin/sh
# husky

# Hook created by Husky
#   Version: 3.0.1
#   At: 7/22/2019, 12:15:44 PM
#   See: https://github.com/typicode/husky#readme

# From
#   Directory: <your-project-path>/umgc_delivery/node_modules/husky
#   Homepage: https://github.com/typicode/husky#readme

scriptPath="node_modules/husky/run.js"
hookName=`basename "$0"`
gitParams="$*"

debug() {
  if [ "${HUSKY_DEBUG}" = "true" ] || [ "${HUSKY_DEBUG}" = "1" ]; then
    echo "husky:debug $1"
  fi
}

debug "$hookName hook started"

if [ "${HUSKY_SKIP_HOOKS}" = "true" ] || [ "${HUSKY_SKIP_HOOKS}" = "1" ]; then
  debug "HUSKY_SKIP_HOOKS is set to ${HUSKY_SKIP_HOOKS}, skipping hook"
  exit 0
fi

if [ "${HUSKY_USE_YARN}" = "true" ] || [ "${HUSKY_USE_YARN}" = "1" ]; then
  debug "calling husky through Yarn"
  yarn husky-run $hookName "$gitParams"
else

  if ! command -v node >/dev/null 2>&1; then
    echo "Info: can't find node in PATH, trying to find a node binary on your system"
  fi

  if [ -f "$scriptPath" ]; then
    # if [ -t 1 ]; then
    #   exec < /dev/tty
    # fi
    if [ -f ~/.huskyrc ]; then
      debug "source ~/.huskyrc"
      . ~/.huskyrc
    fi
    node_modules/run-node/run-node "$scriptPath" $hookName "$gitParams"
  else
    echo "Can't find Husky, skipping $hookName hook"
    echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
  fi
fi
```

## About Icons

In order to keep our bundle size small let's use svg images instead of fortawesome package.

Using icons that way will minimize the bundle size signicantly.

## About BundleAnalyzerPlugin on webpack

In the webpack config file you will see the plugin below which help us figuring out about the modules taking more space on our builds. (https://www.npmjs.com/package/webpack-bundle-analyzer)

```
new BundleAnalyzerPlugin({
  openAnalyzer: false,
  analyzerMode: 'disabled'
})
```

If you want to get it to open on `npm run build` or `npm run web` just set the flag `openAnalyzer: true` and `analyzerMode: 'server'` or `analyzerMode: 'static'`.

In `main.scss` file you will see 3 imports regarding bootstrap:

```
@import "bootstrap/scss/bootstrap.scss";
@import "bootstrap/scss/mixins/_breakpoints.scss";
@import "bootstrap/scss/bootstrap-grid.scss";
```

The last 2 allow you to use breakpoints and its variables; like:

```
@include media-breakpoint-up(xs/sm/md/lg/xl) { ... }
```

Read more: https://react-bootstrap.github.io/

## Vault configuration for Windows

- Download vault.exe from the below URL
```
https://www.vaultproject.io/downloads.html
```
- Add the vault.exe to System path
```
PATH = %PATH%/<vault_exe_folder>/vault.exe
```

- Add below environmental variable for current user
```
VAULT_ADDR=https://vault.umusic.net
ENV=dev
NODE_ENV=development
```

- Running the indian environment, need to set the vault environment
VAULT_ENV=dev1


- Open the command prompt login to vault
```
vault login -method=ldap username=YOUR_NETWORK_ID
```
- After successfull login use will see this message
```

C:\Users\user\projectlocation>vault login -method=ldap username=xxxxxx
Password (will be hidden):xxxxxxxxxx

Success! You are now authenticated. The token information displayed below
is already stored in the token helper. You do NOT need to run "vault login"
again. Future Vault requests will automatically use this token.

Key                    Value
---                    -----
token                  XXXXXXXXXXXXXXXXXXXXXXXX
token_accessor         XXXXXXXXXXXXXXXXXXXXXXXX
```

### Run Docker Locally (Mac OS)

- `docker build . --build-arg VAULT_USER=umg-central-reader.sv --build-arg VAULT_PASS=password --build-arg VAULT_METHOD=userpass -t umgc-web`
- `docker run --rm -it --env ENV=qa --env VAULT_ADDR=https://vault.umusic.net -p 5000:5000 umgc-web`
- http://localhost:5000

`Connect with devops team to get service account password`

## Release Procedure

- First do the UI Library release steps, and then make sure you are using the latest version of that.
- Consider if now might be a good time to update all third party libraries.
- Check that any new vault secrets that the code might be expecting are present on all environments.
- Pull latest develop
- Create release branch (git flow release start VERSION)
- update the version of the UI Library to the latest
- rm -rf node_modules; npm run pull: ui; npm i
- Update Changelog
- Bump version number in package.json
- In package.json update umgcApi.version to the latest api version
- In package.json update umgcApi.useEdge to false
- Make sure all tests are passing.
- Commit changes, and push release branch (Important! Pushing the release branch buiilds the UAT env)
- Give the UAT environment a quick smoke test. Did the deploy work? No obvious breaks?
- finish release branch (git flow release finish VERSION)
- Checkout master
- Push master with tags (git push && git push --tags)
- Checkout develop
- In package.json update umgcApi.useEdge to true. Commit to develop.
- Push develop with tags (git push && git push --tags)
