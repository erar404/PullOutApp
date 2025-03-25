//import { Axios } from 'axios';
import axios from 'axios';

// const axios = require('axios')

export const apiUrl = 'http://rgmcgroup.com:8000/api';
export const loginName = 'P@ssword';

export const axiosInstance = axios.create({
    baseURL: apiUrl
  })
  