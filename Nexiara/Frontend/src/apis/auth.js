import axios from 'axios';
import { toast } from 'react-toastify';

const API = (token) =>
axios.create({
  baseURL: 'http://localhost:5000',
  headers: { Authorization: token },
});

let url = 'http://localhost:5000';

export const loginUser = async (body) => {
  try {
    return await axios.post(`${url}/user/login`, body);
  } catch (error) {
    console.log('error in loginuser api');
  }
};

export const googleAuth = async (body) => {
  try {
    return await axios.post(`${url}/user/google`, body);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (body) => {
  try {
    return await axios.post(`${url}/user/create`, body);
  } catch (error) {
    console.log('error in register api');
  }
};

export const sendOTP = async () => {
  try {
    const token = localStorage.getItem('userToken');
    return await API(token).put(`${url}/user/send-otp`);
  } catch (error) {
    console.log('error in send otp');
  }
};

export const verifyOTP = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    return await API(token).put(`${url}/user/verify-otp`, body);
  } catch (error) {
    console.log('error in verify otp');
  }
};

export const validUser = async () => {
  try {
    const token = localStorage.getItem('userToken');

    const response = await axios.get(`${url}/auth/check-token`, {
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error) {
    console.error('Error in validUser API:', error);
    throw error;
  }
};

export const updateUser = async (body) => {
  try {
    const token = localStorage.getItem('userToken');

    const { data } = await API(token).put(`/user/update`, body);
    return data;
  } catch (error) {
    console.log('error in update user api');
    toast.error('Something Went Wrong.try Again!');
  }
};

export const checkValid = async () => {
  const data = await validUser();
  if (!data?.user) {
    window.location.href = '/login';
  } else {
    window.location.href = '/login';
  }
};
