import axios from 'axios';
import model from '../falcorModel.js';

export default {
  post: falcorPost,
  get: falcorGet,
  create: falcorCreate
};

async function falcorGet(url) {
  const response = await model
    .get(url)
    .then((response) => {
      const data = response.json;
      console.log('API response: ', data);
      return data;
    })
    .catch((error) => {
      console.error(url, error);
    });

  return response;
}

async function falcorPost(url, body) {
  // const response = await model
  //   .set()
}

async function falcorCreate(url, params, values) {
  const response = await model
    .call(url, params, values)
    .then((res) => {
      console.log('API response: ', res)
      return res;
    })
    .catch((error) => {
      console.error(error);
    });

  return response;
}
