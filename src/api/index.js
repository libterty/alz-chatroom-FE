import { postRequest, postAuthRequest, getAuthRequest, putAuthRequest, deleteRequest } from './apiHelper';
import config from '../config';

class Request {
  postSignUp(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postRequest(config.ROOT_URL+'/signup', data);
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

  getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL+'/admin/users');
        resolve(
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  putAdminUser(cId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await putAuthRequest(config.ROOT_URL + `/admin/users/${cId}`, data);
        resolve (
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  deleteUser(cId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await deleteRequest(config.ROOT_URL + `/admin/users/${cId}`);
        resolve (
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  getMessages() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getAuthRequest(config.ROOT_URL + '/chatroom');
        console.log('res', res);
        resolve (
          res
        );
      } catch (error) {
        reject(error);
      }
    })
  }

  postMessage(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await postAuthRequest(config.ROOT_URL + '/chatroom/create', data);
        resolve (
          res.data
        );
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default Request;
