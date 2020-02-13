import axios, { AxiosResponse } from "axios";
import { IActivity } from "../Models/activity";
import { Routes } from "../Routes";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (reponse: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(reponse), ms));

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get(`${Routes.Activities}`),
  detail: (id: string) => requests.get(`${Routes.Activities}/${id}`),
  create: (activity: IActivity) => requests.post(`${Routes.Activities}`, activity),
  update: (activity: IActivity) => requests.put(`${Routes.Activities}/${activity.id}`, activity),
  delete: (id: string) => requests.del(`${Routes.Activities}/${id}`)
};

export default {
  Activities
};
