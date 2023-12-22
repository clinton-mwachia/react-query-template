import Axios from "../axios/Axios";

export const getPost = async (id) => {
  const { data } = await Axios.get(`/posts/${id}`);
  return data;
};

export const getCommentsByPostId = async (id) => {
  const { data } = await Axios.get(`/comments/get/post?postId=${id}`);
  return data;
};

export const updateComment = async ({ id, formData }) => {
  const { data } = await Axios.put(`/comments/${id}`, formData);
  return data;
};

export const addComment = async ({ formData }) => {
  const { data } = await Axios.post(`/comments/register`, formData);
  return data;
};

export const getCommentById = async ({ id }) => {
  const { data } = await Axios.get(`/comments/${id}`);
  return data;
};

export const deleteComment = async (id) => {
  const { data } = await Axios.delete(`/comments/${id}`);
  return data;
};
