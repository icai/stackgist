import axios from 'axios';

import cookie from './cookie';

const inc = axios.create();

if (typeof window !== 'undefined') {
    // egg-security
    inc.defaults.headers.common['x-csrf-token'] = cookie.get('csrfToken') || '';
}
inc.interceptors.request.use(
  function(config) {
    // console.info(config);
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
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default inc;
