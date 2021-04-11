import Vue from 'vue'
import VueRouter from 'vue-router'
import { Cookies } from 'quasar'
import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    document.title = to.meta + ' - Recipes'
    const token = Cookies.get('token')
    if (to.name !== 'Login' && !token) {
      next({ name: 'Login' })
    } else if (to.name === 'Login' && token) {
      next({ name: 'home' })
    } else next()
  })

  return Router
}
