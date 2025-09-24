import axios from 'axios';
import { memoize } from 'lodash-es';

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

export type Analysis = {
  alphabet: string;
  vocabulary: string;
  occupation: string;
  summarize: string[];
  desc: string[];
  characteristic: Array<{
    title: string;
    desc: string[];
  }>;
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
export const getQuestions = memoize(
  () => request<Question[]>('/fapig/character_test/questions', { level: 'senior' }),
  () => 'questions'
);

// 获取结果
export const getAnalysis = memoize(
  (answers: string) =>
    request<Analysis>('/fapig/character_test/analysis', {
      answers,
    }),
  (answers) => answers
);
