import axios from "axios";

const accessTokenKey: string = 'accessToken';

// url 호출 시 기본 값 셋팅
const api = axios.create({
  baseURL: "/",
  headers: { "Content-type": "application/json" }, // data type
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(accessTokenKey);

    //요청시 AccessToken 계속 보내주기
    if (!token) {
      return config;
    }

    if (config.headers && token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    console.log("request start", config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("get response", response);
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        await refreshAccessToken(originalRequest);
        return axios(originalRequest);
      } catch (error) { // refresh token을 통한 access token 재발급 실패
        localStorage.removeItem(accessTokenKey);
        console.log("reissue fail: ", error);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async function(originalRequest: any) {
  const response = await axios.post('/api/auth/reissue', { accessToken: localStorage.getItem(accessTokenKey), });
  const accessToken = response.data.accessToken;
  console.log('hello', accessToken);
  originalRequest.headers.authorization = `Bearer ${accessToken}`;
  localStorage.setItem(accessTokenKey, accessToken);
}

export default api;