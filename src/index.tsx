import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './reactAuthProvider';

declare global {
  interface Document {
    documentMode?: any;
  }
}

ReactDom.render(
  <AzureAD provider={authProvider} forceLogin={true}>
    <App />
  </AzureAD>,
  document.querySelector('#app')
);
