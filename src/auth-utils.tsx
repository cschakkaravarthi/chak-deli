import { UserAgentApplication } from 'msal';
import { appEnv } from './utils/customHooks';
import get from 'lodash.get';

const aadConfig = get(appEnv || window.env, 'aad');

export const requiresInteraction = (errorMessage: string): boolean => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.includes('consent_required') ||
        errorMessage.includes('interaction_required') ||
        errorMessage.includes('login_required')
  );
};

export const fetchMsGraph = async (url: RequestInfo, accessToken: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.json();
};

export const isIE = (): boolean => {
  const ua = window.navigator.userAgent;
  const msie = ua.includes('MSIE ');
  const msie11 = ua.includes('Trident/');

  // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
  // const isEdge = ua.indexOf("Edge/") > -1;

  return msie || msie11;
};

export const GRAPH_SCOPES = {
  WEB_API: aadConfig.endpoints.api,
  EMAIL: 'email',
  PROFILE: 'profile'
};

export const GRAPH_ENDPOINTS = {
  ME: 'https://graph.microsoft.com/v1.0/me',
  MAIL: 'https://graph.microsoft.com/v1.0/me/messages'
};

export const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: [
      GRAPH_SCOPES.WEB_API
    ]
  }
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: aadConfig.clientId,
    authority: aadConfig.authority,
    validateAuthority: aadConfig.validateAuthority,
    redirectUri: window.location.origin + aadConfig.redirectUriEnd,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: aadConfig.cacheLocation,
    storeAuthStateInCookie: false
  },

  system: {
    navigateFrameWait: 0,
    tokenRenewalOffsetSeconds: aadConfig.tokenRenewalOffsetSeconds

  }
});
