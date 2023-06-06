import Axios from "../axios/Axios";

export const getUser = async (id) => {
  const { data } = await Axios.get(`/users/${id}`);
  return data;
};

export const updateUser = async ({ id, formData }) => {
  const { data } = await Axios.put(`/users/${id}`, formData);
  return data;
};

export const deleteUser = async ({ id }) => {
  const { data } = await Axios.delete(`/users/${id}`);
  return data;
};
