import axios from "axios";
// const baseHost = '/api'
const service = axios.create({
  baseURL: "http://" + window.location.host,
  timeout: 30000, // 请求超时时间
});

const getHeaders = () => {
  return new Promise((resolve) => {
    const headers = {};
    headers["Content-Type"] = "application/json";
    headers["timeStamp"] = +new Date();
    resolve(headers);
  });
};
// 添加请求拦截器
service.interceptors.request.use(
  async (config) => {
    config.headers = await getHeaders();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const data = response.data || {};
    // const errorCode = [9001, 9011, 9998, 20032, 20037, -90002];
    // if (errorCode.includes(parseInt(data.code))) {
    //   response.config.fail && response.config.fail("can not catch error!");
    // } else {
    //   data.code == 9999 && console.log(data.msg || "网络异常");
    //   response.config.done && response.config.done(data);
    // }
    return data;
  },
  (error) => {
    // console.error(error);
    // error.config.fail && error.config.fail(error);
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

const request = {
  get({ url, data, done, fail }) {
    return service({
      url,
      params: data,
      method: "get",
      done,
      fail,
    });
  },
  post({ url, data, done, fail }) {
    return service({
      url,
      params: data,
      method: "post",
      done,
      fail,
    });
  },
};
export default request;
