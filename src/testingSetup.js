
// Mock the global environment variables for JEST.
window.env = {
  "aad": {
    "authority": "string",
    "cacheLocation": "string",
    "clientId": "string",
    "endpoints": {
      "api": "string"
    },
    "redirectUriEnd": "string",
    "tenant": "string",
    "tokenRenewalOffsetSeconds": 60,
    "validateAuthority": true
  },
  "centralApi": {
    "baseUrl": "string"
  },
  "cloudfrontEndpoint": {
    "baseUrl": "string"
  },
  "serviceNowUri": {
    "baseUrl": "string"
  },
  "googleAnalytics": {
    "REACT_APP_GA_DEBUG": true,
    "REACT_APP_GA_TRACKING_ID": "string"
  },
  "logging": {
    "LOGGING_ACCESS_FORMAT": "string",
    "LOGGING_COMPRESS": "string",
    "LOGGING_INTERVAL": "string",
    "LOGGING_LEVEL": "string",
    "LOGGING_MAX_SIZE": "string",
    "LOGGING_PATH": "string",
    "LOGGING_REQUESTS_ON_STDOUT": "string",
    "LOGGING_SPLUNK_BATCH_INTERVAL": "string",
    "LOGGING_SPLUNK_MAX_BATCH_COUNT": "string",
    "LOGGING_SPLUNK_MAX_BATCH_SIZE": "string",
    "LOGGING_SPLUNK_TOKEN": "string",
    "LOGGING_SPLUNK_URL": "string"
  }
};

jest.mock('./shared/services/apiClient', () => {
  return {
    defaults: { headers: { common: { Authorization: 'Bearer test token' } } },
    get: jest.fn()
  };
});
jest.mock('./reactAuthProvider', () => {
  return {
    getUserInfo: () => ({
      userName: 'string'
    })
  };
});
