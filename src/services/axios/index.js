import axios from "axios";

const baseUrl = "https://no23.lavina.tech/";

const request = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

request.interceptors.response.use((response) => {
  return response;
}, errorHandler);

function errorHandler(error) {
  if (error.response) {
    if(error.response.status === 401){}
    return Promise.reject(error.response);
  }
  if (error.request) {
    return Promise.reject(error.request);
  }
  return Promise.reject(error);
}

export { request };
