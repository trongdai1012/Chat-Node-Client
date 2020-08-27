import axios from 'axios';
import { URL_API } from '../configs/url';

export const LOGIN_URL = 'user/authentication';
export const REGISTER_URL = "user/register";
export const ME_URL = "user/userInfo";

export const login = (email, password) => {
    return axios.post(URL_API + LOGIN_URL, { email, password });
}

export const register = (email, mobile, name, password, birthDay, address) => {
    return axios.post(URL_API + REGISTER_URL, { email, mobile, name, birthDay, address, status: 1, del: 0, password });
}

export const getUserByToken = (token) => {
    return axios.get(URL_API + ME_URL + '?token=' + token);
}