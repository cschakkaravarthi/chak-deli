import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { appEnv } from './utils/customHooks';
import get from 'lodash.get';
import { UserInfo } from './shared/models/UserInfo.model';

const aadConfig = get(appEnv || window.env, 'aad');

const config = {
  auth: {
    authority: aadConfig.authority,
    clientId: aadConfig.clientId,
    redirectUri: window.location.origin + aadConfig.redirectUriEnd
  },
  cache: {
    cacheLocation: aadConfig.cacheLocation,
    storeAuthStateInCookie: false
  },
  system: {
    navigateFrameWait: 30,
    tokenRenewalOffsetSeconds: aadConfig.tokenRenewalOffsetSeconds

  }
};

export const GRAPH_SCOPES = {
  WEB_API: aadConfig.endpoints.api
};

const authenticationParameters = {
  scopes: [
    GRAPH_SCOPES.WEB_API
  ]
};

// const options = {
//   loginType: LoginType.Redirect
// };

export const authProvider = new MsalAuthProvider(config, authenticationParameters, LoginType.Redirect);

/**
 * Due to MSAL issue, https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1225
 * We are blocking to request multiple getaccesstoken When MSAL is redict to refresh the token.
 * So the logic is, When MSAL try to acquiretokensilent from microsoft, We stop all further getaccess token and do a wait time.
 * Usually its not taking more than 100ms. So We set that and using the token as tempToken.
 */
export const getAccessToken = async (): Promise<string> => {
  // if (multipleAPIReq === true) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (!multipleAPIReq) {
  //         resolve(tempToken);
  //       }
  //     }, 100);
  //   });
  // }

  return new Promise((resolve, reject) => {
    // multipleAPIReq = true;
    authProvider.acquireTokenSilent(authenticationParameters).then((response) => {
      // multipleAPIReq = false;
      // tempToken = response.accessToken;
      resolve(response.accessToken);
    }).catch((err) => {
      /// On Safari and Mobile, We are getting this error for the first time. A known issue From MSAL.
      /// So We are redirecting microsoft again. - Issue is not fixed on latest MSAL version 1.2.1.
      if (err.errorCode === 'login_required') {
        authProvider.acquireTokenRedirect(authenticationParameters);
      } else {
        reject(err);
      }
    });
  });
};
/**
     * Getting the User information from ID token.
     *
     * @returns {UserInfo} -  return name and profile
     * @memberof AuthProvider
     */
export function getUserInfo (): UserInfo {
  const useraccount = authProvider.getAccount();
  if (!useraccount) {
    const errorInfo = 'Login is expired, please login again!';
    throw errorInfo;
  }

  if (useraccount.idTokenClaims.given_name || useraccount.idTokenClaims.family_name) {
    const profile = {
      given_name: useraccount.idTokenClaims.given_name || '',
      family_name: useraccount.idTokenClaims.family_name || ''
    };
    const name = `${profile.given_name} ${profile.family_name}`;
    return { userName: useraccount.userName, profile: profile, name: name };
  }

  if (useraccount.name && useraccount.name && useraccount.name.length > 0) {
    const profile = {
      given_name: useraccount.name.split(',')[1] || '',
      family_name: useraccount.name.split(',')[0] || ''
    };
    const name = `${profile.given_name} ${profile.family_name}`;
    return { userName: useraccount.userName, profile: profile, name: name };
  } else {
    return {};
  }
}
