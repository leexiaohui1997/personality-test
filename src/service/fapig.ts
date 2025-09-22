import axios from 'axios';

export type Response<T> = {
  error_code: number;
  reason: string;
  result: T;
};

export type Question = {
  q: string;
  a: string;
  b: string;
  ia: string;
  ib: string;
};

const APP_KEY = import.meta.env.VITE_FAPIG_APP_KEY;

async function request<R>(url: string, params: Record<string, unknown>): Promise<R> {
  const { data } = await axios.get<Response<R>>(url, { params: { ...params, key: APP_KEY } });
  if (data.error_code !== 0) {
    throw new Error(data.reason);
  }
  return data.result;
}

// 获取题目
export const getQuestions = () =>
  request<Question[]>('/fapig/character_test/questions', { level: 'senior' });
