import axios from "axios";

const Axios = axios.create({
  baseURL: " http://localhost:3000",
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
