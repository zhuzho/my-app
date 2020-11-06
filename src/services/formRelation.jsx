import { post } from '@utils/request.js';

 
export async function onHome() {
  return await post(`/form/config/relation/json`);
}
