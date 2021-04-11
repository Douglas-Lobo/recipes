export default function () {
  return {
    recipes: {
      data: []
    },
    relatedsRecipes: {
      data: []
    },
    showSpinner: true,
    recipe: {
      id: '',
      name: '',
      description: '',
      ingredients: '',
      preaparation_time: '',
      preaparation_mode: '',
      yield: '',
      photos: [],
      categories: []

    }
  }
}
