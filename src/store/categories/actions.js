import Vue from 'vue'
export async function setCategories ({ commit }) {
  await Vue.prototype.$axios.get('/categories')
    .then(res => {
      commit('setCategories', res.data.data)
    }).catch(error => {
      console.log(error.response)
    })
}
