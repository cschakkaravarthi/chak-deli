export default interface ErrorModel {
  message: string;
  isError: boolean;
  errorDetails?: object;
}

export const dummyErrorModel: ErrorModel = {
  isError: true,
  errorDetails: {},
  message: 'Dummy Error Message'
};

export interface ApiErrorModel {
  response?: ErrorResponseData;
  message?: string;
  name?: string;
  stack?: string;
}

export interface Data {
  errors: string;
  response?: string | object | null;
  message: string;
  apiVersion: string;
}

export interface ErrorResponseData {
  data?: Data;
  status?: number;
  statusText?: string;
}

export const dummyApiErrorModel: ApiErrorModel = {
  response: {
    data: {
      errors: 'Api error',
      response: '',
      message: 'Request failed with status code 400',
      apiVersion: '4.2.1'
    },
    status: 400,
    statusText: 'Request failed with status code 400'
  },
  message: '',
  name: '',
  stack: ''
};
