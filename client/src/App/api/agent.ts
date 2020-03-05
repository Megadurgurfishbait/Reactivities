import axios, { AxiosResponse } from "axios";
import { IActivity } from "../Models/activity";
import { Routes } from "../Routes";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../Models/user";
import { IProfile, IPhoto } from "../Models/profile";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Use tekur tvö arguments, fyrsta er ef að promise er staðið við.
// Seinna er On Rejected
axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network - Make Sure API is Running");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }

  if (status === 400 && config.method === "get" && data.errors.hasOwnProperty("id")) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server Error - Check the Terminal for more info!");
  }
  throw error.response;
});

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
      .then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "content-type": "multipart/form-data" }
      })
      .then(responseBody);
  }
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get(`${Routes.Activities}`),
  detail: (id: string) => requests.get(`${Routes.Activities}/${id}`),
  create: (activity: IActivity) => requests.post(`${Routes.Activities}`, activity),
  update: (activity: IActivity) => requests.put(`${Routes.Activities}/${activity.id}`, activity),
  delete: (id: string) => requests.del(`${Routes.Activities}/${id}`),
  attend: (id: string) => requests.post(`${Routes.Activities}/${id}/attend`, {}),
  unattend: (id: string) => requests.del(`${Routes.Activities}/${id}/attend`)
};

const User = {
  current: (): Promise<IUser> => requests.get(`${Routes.User}`),
  login: (user: IUserFormValues): Promise<IUser> => requests.post(`${Routes.UserLogin}`, user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post(`${Routes.UserRegister}`, user)
};

const Profile = {
  get: (username: string): Promise<IProfile> => requests.get(`${Routes.Profiles}/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setmain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`)
};

export default {
  Activities,
  User,
  Profile
};
