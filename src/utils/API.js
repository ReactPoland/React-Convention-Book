import axios from 'axios';
import model from '../falcorModel.js';

export default {
  post: falcorPost,
  get: falcorGet
};

// mock below
// const prefix = ['restaurants', 0];

async function falcorGet(url) {
  // url = Array.isArray(url)
  //   ? prefix.concat(url)
  //   : prefix.join('.') + '.' + url;

  const response = await model
    .get(url)
    .then((response) => {
      const data = response.json;//[prefix[0]][prefix[1]];
      console.log('API response: ', data);
      return data;
    })
    .catch((error) => {
      console.error(url, error);
    });

  return response;
}

async function falcorPost(url) {

}

// const API_URL = 'http://private-4ce55-rr3.apiary-mock.com';

// export default async function axiosHttpRequest(requestObj) {
//   try {
//     let response = await axios({
//       method: requestObj.method,
//       url: API_URL + requestObj.url,
//       data: requestObj.data,
//       ///////// without credentials for apiary only!!
//       // withCredentials: true
//     });
//     console.log('axiosHttpRequest Response', response);
//     return response;
//   }
//   catch(error) {
//     console.log('axiosHttpRequest Error', error);
//     return error;
//   }
// }
