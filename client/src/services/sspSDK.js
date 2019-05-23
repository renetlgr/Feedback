import axios from 'axios';
import toast from './Notifications/toast';
//import notes from './API/Notes';

const isProdEnvironment = process.env.NODE_ENV === 'production' ? true : true;
const apiUrl = isProdEnvironment ? '/api' : 'http://localhost:5000/api';

const SSP_SDK = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  params: {},
  data: {},
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

function _getTimeStamp() {
  return '[' + new Date().toLocaleString("en-US") + ']';
}

function successResponseHandler(response) {
  if (!isProdEnvironment) {
    let message = {STATUS: response.status, METHOD: response.config.method.toUpperCase(), URL: response.config.url, 'REQ DATA': JSON.parse(response.config.data), 'RES DATA': response.data}
    console.log(_getTimeStamp(), 'Response', message);
  }
  return response;
}

function errorResponseHandler(error) {
  if (!isProdEnvironment) {
    console.log("process.env.NODE_ENV",process.env.NODE_ENV);

    console.log("isProdEnvironment",isProdEnvironment);
    console.log('Error Intercepted ', error);
    // check for errorHandle config
    if (Object.prototype.hasOwnProperty.call(error, 'errorHandle') && error.config.errorHandle === false) {
      return Promise.reject(error.request);
    }

    // if has response show the error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      toast.error(JSON.stringify(error.response.data.message));
      console.log('Error Data: ', JSON.stringify(error.response.data));
      console.log('Error Status: ', JSON.stringify(error.response.status));
      console.log('Error Headers: ', JSON.stringify(error.response.headers));
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('Error Request: ', JSON.stringify(error.request));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error Message: ', JSON.stringify(error.message));
    }
    console.log('Error Config: ', JSON.stringify(error.config));
  }
  return Promise.reject(error.response);
}

SSP_SDK.interceptors.request.use(request => {
  if (!isProdEnvironment) {
    let message = {METHOD: request.method.toUpperCase(), URL: request.url, DATA: request.data};
    console.log(_getTimeStamp(), 'Request', message);
  }
  return request
})

SSP_SDK.interceptors.response.use(
  successResponseHandler,
  errorResponseHandler
);

//SSP_SDK.notes = notes;
export default SSP_SDK;
