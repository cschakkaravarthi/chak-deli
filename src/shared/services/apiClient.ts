import axios from 'axios';
import get from 'lodash.get';
import packageJson from '../../../package.json';
import { getAccessToken } from '../../reactAuthProvider';
import { appEnv } from '../../utils/customHooks';

const apiVersion = packageJson.umgcApi.useEdge ? 'dev/' : `v${packageJson.umgcApi.version}/`;

// For some reason appEnv is undefined at this point, but window.env is not?
const client = axios.create({
  baseURL: get(appEnv || window.env, 'centralApi.baseUrl') + apiVersion
});

client.interceptors.request.use(request => {
  return new Promise((resolve, reject) => {
    getAccessToken()
      .then(accessTokenRepsonse => {
        request.headers.Authorization = 'Bearer ' + accessTokenRepsonse;
        resolve(request);
      })
      .catch(() => {
        // console.log('the catch token is ' + client.defaults.headers.common.Authorization);
        reject(request);
      });
  });
});

// @TODO: Logs for dev only.
client.interceptors.request.use(request => {
  // console.log('Starting Request:');
  // console.log(request);
  return request;
});

client.interceptors.response.use(response => {
  // console.log('Response:');
  // console.log(response);
  return response;
});

export default client;
