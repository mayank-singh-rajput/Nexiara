import axios from "axios";
import { toast } from "react-toastify";

const API = (token) =>
  axios.create({
    baseURL: "http://localhost:5000",
    headers: { Authorization: token },
  });

export const createResult = async (body) => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).post(`/create/result`, body);
  } catch (error) {
    console.log("error in create Result api");
    toast.error("Something Went Wrong.try Again!");
  }
};

export const updateResult = async (id, body) => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).put(`/update/result/${id}`, body);
  } catch (error) {
    console.log("error in update Result api");
    toast.error("Something Went Wrong.try Again!");
  }
};

export const getResult = async () => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).get(`/get/user/result`);
  } catch (error) {
    console.log("error in fetch Result api");
    toast.error("Something Went Wrong.try Again!");
  }
};

export const getResultById = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).get(`/get/result/${id}`);
  } catch (error) {
    console.log("error in fetch Result api");
    toast.error("Something Went Wrong.try Again!");
  }
};

export const deleteResult = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).delete(`/delete/result/${id}`);
  } catch (error) {
    console.log("error in delete Result api");
    toast.error("Something Went Wrong.try Again!");
  }
};
