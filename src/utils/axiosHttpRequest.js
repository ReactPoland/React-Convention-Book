import axios from 'axios';

export async function axiosHttpRequest(requestObj) {
  try {
    let response = await axios({
      method: requestObj.method,
      url: requestObj.url,
      data: requestObj.data,
      withCredentials: true
    });
    console.log('axiosHttpRequest Response', response);
    return response;
  }
  catch(error) {
    console.log('axiosHttpRequest Error', error);
    return error;
  }
}
