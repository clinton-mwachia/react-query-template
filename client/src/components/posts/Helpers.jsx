import Axios from "../axios/Axios";

export const getPosts = async () => {
  const { data } = await Axios.get("/posts");
  return data;
};
