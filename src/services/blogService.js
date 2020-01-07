import axios from 'axios';
const baseUrl = '/api/blogposts';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};
const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log('blogservice getAll error: ', error);
    return null;
  }
};

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const remove = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};


const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken
};