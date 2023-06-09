import Axios from "../axios/Axios";

export const getPosts = async ({ page, limit = 10 }) => {
  const { data } = await Axios.get(`/posts?page=${page}&limit=${limit}`);
  return data;
};
