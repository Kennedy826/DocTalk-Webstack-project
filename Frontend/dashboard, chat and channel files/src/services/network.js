import axios from 'axios';
import { getItemFromStorage } from '../utils/helper';

const baseUrl = process.env.REACT_APP_API_URL;

const handleError = (error) => {
  const { response } = error;

  if (error && response) {
    if (response.data.code === 401) {
      window.location.replace('/login');
    }
    throw response.data;
  }
  throw error;
};

const publicGet = (url, params) =>
  axios
    .get(baseUrl + url, { params })
    .then((response) => response.data)
    .catch((error) => handleError(error));

const publicPost = (url, payload) =>
  axios
    .post(baseUrl + url, payload)
    .then((response) => response.data)
    .catch((error) => handleError(error));

const userGet = (url, params) =>
  axios
    .get(baseUrl + url, {
      params,
      headers: {
        Authorization: getItemFromStorage('userToken'),
      },
    })
    .then((response) => response.data)
    .catch((error) => handleError(error));

const userPost = (url, payload) =>
  axios
    .post(baseUrl + url, payload, {
      headers: { Authorization: getItemFromStorage('userToken') },
    })
    .then((response) => response.data)
    .catch((error) => handleError(error));

export default {
  publicGet,
  publicPost,
  userGet,
  userPost,
};
