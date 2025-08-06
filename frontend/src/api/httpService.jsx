import axiosInstance from "./axiosConfig";

// GET request
export const getRequest = async (url) => {
  const response = await axiosInstance.get(url);
  // return response.data;
  return response;
};

// POST request
export const postRequest = async (url, data) => {
  const response = await axiosInstance.post(url, data);
  // return response.data;
  return response;
};

// PUT request
export const putRequest = async (url, data) => {
  const response = await axiosInstance.put(url, data);
  // return response.data;
  return response;
};

// DELETE request
export const deleteRequest = async (url) => {
  const response = await axiosInstance.delete(url);
  // return response.data;
  return response;
};

// PATCH request
export const patchRequest = async (url, data) => {
  const response = await axiosInstance.patch(url, data);
  // return response.data;
  return response;
};

// export const getRequest = (url) => axios.get(API_BASE + url);
// export const postRequest = (url, data) => axios.post(API_BASE + url, data);
// export const putRequest = (url, data) => axios.put(API_BASE + url, data);
// export const deleteRequest = (url) => axios.delete(API_BASE + url);
