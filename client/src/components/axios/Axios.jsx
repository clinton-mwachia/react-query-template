import axios from "axios";

const Axios = axios.create({
  baseURL: " http://localhost:8010/api/v0",
});

Axios.interceptors.request.use(
  function (response) {
    return response;
  },
  (error) => {
    return error;
  }
);

export default Axios;
