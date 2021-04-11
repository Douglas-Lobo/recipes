
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'home', meta: 'Home', component: () => import('pages/Recipes.vue') },
      { path: '/cadastrar-receita', name: 'cadastrar-receita', meta: 'Cadastrar Receita', component: () => import('pages/RegRecipe.vue') },
      { path: '/receita/:id', name: 'receita', meta: 'Receita', props: true, component: () => import('pages/Recipe.vue') },
      { path: '/editar-receita/:id', name: 'editar-receita', meta: 'Editar Receita', props: true, component: () => import('pages/EditRecipe.vue') }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: 'Login',
    component: () => import('pages/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    name: '404',
    meta: '404',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
