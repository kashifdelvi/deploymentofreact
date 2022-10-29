import axios from 'axios';
import {
  reqFulfil,
  reqError,
  resFulfil,
  resError,
  reqFulfilWithoutToken
} from "./interceptor"
import {config} from "./config";

const instanceData = {
  baseURL:'http://localhost:9191',
  timeout:6000,
  ...config
}

console.log(instanceData)
const axiosInstanceWithoutToken = axios.create(instanceData);
const axiosInstanceWithToken = axios.create(instanceData);

axiosInstanceWithToken.interceptors.request.use(reqFulfil,reqError);
axiosInstanceWithToken.interceptors.response.use(resFulfil,resError);
axiosInstanceWithoutToken.interceptors.request.use(reqFulfilWithoutToken,reqError);
axiosInstanceWithoutToken.interceptors.response.use(resFulfil,resError);


export  {axiosInstanceWithToken, axiosInstanceWithoutToken} ;