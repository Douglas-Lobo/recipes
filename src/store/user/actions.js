import Vue from 'vue'
import { Cookies } from 'quasar'

export async function getToken ({ commit, dispatch }, payload) {
  await Vue.prototype.$axios({
    method: 'post',
    url: '/login',
    data: payload
  }).then(res => {
    commit('setToken', res.data.token_type + ' ' + res.data.access_token)
    Cookies.set('token', res.data.token_type + ' ' + res.data.access_token)
    Vue.prototype.$axios.defaults.headers.common.Authorization = res.data.token_type + ' ' + res.data.access_token
    dispatch('getUser')
  }).catch(err => {
    return err.response.data
  })
}

export async function getUser ({ commit }) {
  await Vue.prototype.$axios({
    method: 'post',
    url: '/me'
  }).then(res => {
    commit('setUser', res.data)
    commit('setLogged', true)
  }).catch(err => {
    commit('setLogged', false)
    return err.data
  })
}

export async function logout ({ commit }) {
  await Vue.prototype.$axios({
    method: 'post',
    url: '/logout'
  }).then(res => {
    commit('setLogged', false)
    Cookies.remove('token')
  }).catch(err => {
    console.log(err.data)
  })
}

export async function refreshToken ({ commit }) {
  await Vue.prototype.$axios({
    method: 'post',
    url: '/refresh'
  }).then(res => {
    commit('setToken', res.data.token_type + ' ' + res.data.access_token)
    Cookies.set('token', res.data.token_type + ' ' + res.data.access_token)
  }).catch(err => {
    return err.data
  })
}
