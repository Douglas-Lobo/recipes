import Vue from 'vue'
import axios from 'axios'
import { Cookies } from 'quasar'
import { routerInstance } from './routerBoot'
import Store from '../store'

axios.defaults.baseURL = 'http://localhost:8000/api/v1'
Vue.prototype.$axios = axios

const token = Cookies.get('token')
if (token) {
  axios.defaults.headers.common.Authorization = token
}

axios.interceptors.response.use(response => {
  return response
}, error => {
  Cookies.remove('token')
  Store().commit('user/setLogged', false)
  if (routerInstance.currentRoute.name !== 'Login') {
    setTimeout(() => {
      routerInstance.push({ name: 'Login' })
    }, 1000)
  }
  return Promise.reject(error)
})
