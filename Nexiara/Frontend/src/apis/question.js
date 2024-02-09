import axios from "axios";
import { toast } from "react-toastify";

const API = (token) =>
  axios.create({
    baseURL: "http://localhost:5000",
    headers: { Authorization: token },
  });

export const createQuestion = async (body) => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).post(`/create/question`, body);
  } catch (error) {
    console.log("error in create question api");
    toast.error("Something Went Wrong.try Again!");
  }
};

export const updateQuestion = async (id, body) => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).put(`/update/question/${id}`, body);
  } catch (error) {
    console.log("error in update question api");
    toast.error("Something Went Wrong.try Again!");
  }
};

export const getQuestion = async () => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).get(`/get/all/question`);
  } catch (error) {
    console.log("error in fetch question api");
    toast.error("Something Went Wrong.try Again!");
  }
};

export const getQuestionById = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).get(`/get/question/${id}`);
  } catch (error) {
    console.log("error in fetch question api");
    toast.error("Something Went Wrong.try Again!");
  }
};

export const deleteQuestion = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    return await API(token).delete(`/delete/question/${id}`);
  } catch (error) {
    console.log("error in delete question api");
    toast.error("Something Went Wrong.try Again!");
  }
};
