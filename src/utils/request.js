/**
 * use the fetch of dva default || 这个也需要封装post/get/put等方法，这里也可以改成封装axios
 * fetch提供的接口很简单，而且兼容性不是很好。fetch对于4** 或者 5** 错误也会Resolved。
 * axios返回的是promise对象。
 */
import axios from 'axios';
import $$ from 'cmn-utils';
// import os from 'os';
// import messageAlert from '../components/Notification';

// const hostName = os.hostname();
// 创建axios实例
const headers = (() => {
  const token = $$.getStore('token');
  return token ? { Auth: token } : {};
})();
const httpObj = axios.create({
  baseURL: '/api',
  timeout: 15000, // 请求超时时间
  headers,
});

httpObj.defaults.withCredentials = true;

httpObj.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

httpObj.interceptors.response.use(
  (response) => {
    // messageAlert.show({
    //   type: 'success',
    //   message: `${response.statusText}[${response.status}]`,
    // });
    // http status 200
    if (response.status >= 200 && response.status < 300) {
      // success
      return Promise.resolve(response.data);
    } else if (response.status === 403) {
      // login failed
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default httpObj;
function setHeaders(headers) {
  axios.defaults.headers['Content-Type'] = headers['Content-Type'];
}
export function get(url, params) {
  return new Promise((resolve, reject) => {
    httpObj.get(url, {
      params,
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
export function post(url, params, headers) {
  return new Promise((reslove, reject) => {
    if (headers) {
      setHeaders(headers);
    }
    httpObj.post(url, params)
      .then((res) => {
        reslove(res);
      }).catch((err) => {
        reject(err);
      });
  });
}
