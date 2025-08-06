import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./httpService";

// Auth
export function loginUser(data) {
  return postRequest("token/", data);
}

export function refreshToken(data) {
  return postRequest("token/refresh/", data);
}

export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};

export function createUser(data) {
  return postRequest("customers/", data);
}

export function getUsers() {
  return getRequest("customers/");
}
// Items
export function getProducts() {
  return getRequest("products/");
}

export function viewDetail(pk) {
  return getRequest(`products/${pk}`);
}

export function createItem(data) {
  return postRequest("items/", data);
}

export function updateItem(id, data) {
  return putRequest(`items/${id}/`, data);
}

export function deleteItem(id) {
  return deleteRequest(`items/${id}/`);
}

export const chatBotMessage = (message) => {
  return postRequest("chatbot/", { message });
};

export const addCategory = (data) => {
  return postRequest("categories/", data);
};

export const getCategory = () => {
  return getRequest("categories/");
}

export const getCategoryById = (id) => {
  return getRequest(`categories/${id}/`);
}

export const updateCategory = (id, data) => {
  return putRequest(`categories/${id}/`, data);
}

export const deleteCategory = (id) => {
  return deleteRequest(`categories/${id}/`);
}

export const addProduct = (data) => {
  return postRequest("products/", data)
}

export const retrieveMe = () => {
  return getRequest("user/me/");
};
