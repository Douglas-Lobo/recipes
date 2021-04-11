import Vue from 'vue'

export async function getRecipes ({ commit }, search) {
  let url = '/recipes'
  if (search) {
    url = '/recipes?s=name:like:%' + search + '%'
  }
  await Vue.prototype.$axios.get(url)
    .then(res => {
      commit('setRecipes', res.data)
      commit('changeSpinner', false)
    }).catch(error => {
      console.log(error.response)
    })
}
export async function changePage ({ commit }, page) {
  await Vue.prototype.$axios.get('/recipes?page=' + page)
    .then(res => {
      commit('setRecipes', res.data)
      commit('changeSpinner', false)
    }).catch(error => {
      console.log(error.response)
    })
}
export async function deleteRecipe ({ commit }, id) {
  await Vue.prototype.$axios.delete('/recipes/' + id)
    .catch(error => {
      console.log(error.response)
    })
}

export async function getRecipe ({ commit }, id) {
  await Vue.prototype.$axios.get('/recipes/' + id)
    .then(res => {
      commit('setRecipe', res.data.data[0])
      commit('changeSpinner', false)
    }).catch(error => {
      console.log(error.response)
    })
}

export async function regRecipe ({ commit }, payload) {
  await Vue.prototype.$axios({
    method: 'post',
    url: '/recipes',
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch(error => {
    console.log(error.response)
  })
}

export async function updateRecipe ({ commit }, payload) {
  await Vue.prototype.$axios({
    method: 'post',
    url: '/recipes/' + payload.recipe_id,
    data: payload.fd,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch(error => {
    console.log(error.response)
  })
}

export async function delImg ({ commit }, id) {
  await Vue.prototype.$axios.delete('/recipe_photos/' + id)
    .catch(error => {
      console.log(error.response)
    })
}

export async function setRelatedsRecipes ({ commit }, payload) {
  await Vue.prototype.$axios({
    method: 'post',
    url: '/recipes/related-categories',
    data: { categories: payload.categories, recipe_id: payload.recipe_id }
  }).then(res => {
    commit('setRelatedsRecipes', res.data)
  }).catch(error => {
    console.log(error.response)
  })
}
