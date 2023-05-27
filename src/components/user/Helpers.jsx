import Axios from "../axios/Axios";

export const getUser = async (id) => {
  const { data } = await Axios.get(`/users/${id}`);
  return data;
};
