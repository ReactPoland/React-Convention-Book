import axios from 'axios';

const API_URL = 'http://private-4ce55-rr3.apiary-mock.com';

export async function axiosHttpRequest(requestObj) {
  try {
    let response = await axios({
      method: requestObj.method,
      url: API_URL + requestObj.url,
      data: requestObj.data,
      ///////// without credentials for apiary only!!
      // withCredentials: true
    });
    console.log('axiosHttpRequest Response', response);
    return response;
  }
  catch(error) {
    console.log('axiosHttpRequest Error', error);
    return error;
  }
}
