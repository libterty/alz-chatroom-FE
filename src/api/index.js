import { postRequest } from './apiHelper';
import config from '../config';

class Request {
  postSignUp(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL+'/signup', data);
        console.log('res data', res);
        resolve (
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }
  postSignIn(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL+'/signin', data);
        res.data.status === 'success' ? localStorage.setItem('credit', JSON.stringify(res.data)) : null;
        resolve(
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }

}

export default Request;
