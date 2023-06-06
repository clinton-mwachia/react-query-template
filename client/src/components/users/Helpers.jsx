import Axios from "../axios/Axios";

export const getUsers = async () => {
  const { data } = await Axios.get("/users");
  return data;
};
