import { post } from '../../utils/request';

export async function login(payload) {
  return post('login', payload);
};
