import qs from 'qs';
import { fetch } from 'dva';
import { history } from 'umi';
import { SERVICE_PRE_FIX } from './config';

// checkStatus
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// request
export default async function request(url, params) {
  const { method = 'GET', body, ...other } = params || {};
  const newParams = { method, credentials: 'include', ...other };

  if (method !== 'GET') {
    if (!(body instanceof FormData)) {
      newParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newParams.headers,
      };
      newParams.body = JSON.stringify(body);
    }
  } else {
    // 增加时间戳 避免IE缓存 仅 GET
    const t = new Date().getTime();
    const new_query = { ...body, t };
    url = `http://localhost:8102${url}?${qs.stringify(new_query)}`;
  }

  newParams.headers = {
    ...newParams.headers,
    credentials: 'include',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
  newParams.mode = 'cors';

  const response = await fetch(`${url}`, newParams);
  checkStatus(response);
  let res = await response.json();
  if (res && res.code === 'REC008') {
    if (history.location && history.location.pathname === '/joblist/detail') {
      history.push('/', {
        detailId: history.location.query.id,
      });
    } else {
      history.push('/');
    }
  }
  return res;
}

export async function post(path, params) {
  return request(path, { method: 'POST', body: params });
}
