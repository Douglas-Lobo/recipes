export function addRecipe (state, payload) {
  state.recipe.push(payload)
}

export function setRecipes (state, payload) {
  state.recipes = payload
}

export function changeSpinner (state, payload) {
  state.showSpinner = payload
}

export function setRecipe (state, payload) {
  state.recipe = payload
}

export function setRelatedsRecipes (state, payload) {
  state.relatedsRecipes = payload
}
