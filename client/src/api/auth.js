import axios from './axios.js';


const API = 'http://localhost:3000/api';

export const registerRequest = user => {
  user.email = user.email.trim().toLowerCase();//quita espacios y solo permite minusculas
  user.username = user.username.trim();
  return axios.post(`/register`, user);
};

export const loginRequest = user => {
  user.email = user.email.trim().toLowerCase(); //quita espacios y solo permite minusculas
  return axios.post(`/login`, user);
};

export const verifyTokenRequest = () => axios.get('/verify');

export const userRequest = () => axios.get('/user');

export const deleteUserRequest = (userId) => {
    return axios.delete(`/user/${userId}`);
  };
  