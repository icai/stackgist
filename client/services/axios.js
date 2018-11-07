import axios from 'axios';

import cookie from './cookie';
import conf from 'config'

const inc = axios.create();

if (typeof window !== 'undefined') {
    // egg-security
    inc.defaults.headers.common['x-csrf-token'] = cookie.get('csrfToken') || '';
}



inc.interceptors.request.use(
  function(config) {
    config.url = conf.wrapHost(config.url);
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
inc.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default inc;
