import Axios from "../axios/Axios";

export const getPost = async (id) => {
  const { data } = await Axios.get(`/posts/${id}`);
  return data;
};

export const getCommentsByPostId = async (id) => {
  const { data } = await Axios.get(`/comments/get/post?postId=${id}`);
  return data;
};

export const updatePost = async ({ id, formData }) => {
  const { data } = await Axios.put(`/posts/${id}`, formData);
  return data;
};

export const deleteComment = async ({ id }) => {
  const { data } = await Axios.delete(`/comments/${id}`);
  return data;
};
