window.env = {
    "aad": {
      "authority": "https://login.microsoftonline.com/bbcb6b2f-8c7c-4e24-86e4-6c36fed00b78/",
      "cacheLocation": "localStorage",
      "clientId": "d1c7e76e-dcc6-4dad-a5b8-00272f3f9bf8",
      "endpoints": {
        "api": "api://uat-api-node-app/Read"
      },
      "redirectUriEnd": "/aad_redirect_callback",
      "tenant": "bbcb6b2f-8c7c-4e24-86e4-6c36fed00b78",
      "tokenRenewalOffsetSeconds": 60,
      "validateAuthority": true
    },
    "centralApi": {
      "baseUrl": "https://centralapiqa.umusic.net/api/"
    },
    "cloudfrontEndpoint": {
      "baseUrl": "https://assets.centralqa.umusic.net/"
    },
    "googleAnalytics": {
      "REACT_APP_GA_DEBUG": false,
      "REACT_APP_GA_TRACKING_ID": "UA-153453095-2"
    },
    "serviceNowUri": {
      "baseUrl": "https://umusicdev.service-now.com/",
      "feedbackUrl": "https://umusicdev.service-now.com/assessment_take2.do?sysparm_assessable_type=34ffaa83dbed405015f5320a68961923"
    }
  }