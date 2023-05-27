import Axios from "../axios/Axios";

export const getUsers = async () => {
  const res = await Axios.get("/users");
  return res.data;
};
