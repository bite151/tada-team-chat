import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { StateInterface } from '../store'
import routes from './routes'

export default route<StateInterface>(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  Router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('userName')
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else if (to.name === 'Login' && isAuthenticated) next({ name: 'Chat' })
    else next()
  })
  return Router
})