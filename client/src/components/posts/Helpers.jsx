import Axios from "../axios/Axios";

export const getPosts = async ({ page, limit = 10 }) => {
  const { data } = await Axios.get(`/posts?page=${page}&limit=${limit}`);
  return data;
};

export const newPost = async ({ formData }) => {
  const { data } = await Axios.post(`/posts/register`, formData);
  return data;
};

export const getPostById = async ({ id }) => {
  const { data } = await Axios.get(`/posts/${id}`);
  return data;
};
