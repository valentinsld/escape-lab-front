import Vue from 'vue'
import VueRouter from 'vue-router'

const ViewConnection = () => import(/* webpackChunkName: "view-connection" */ '@/views/ViewConnection')
const ViewGame = () => import(/* webpackChunkName: "view-game" */ '@/views/ViewGame')

Vue.use(VueRouter)
let routes = [
  {
    path: '/',
    component: ViewConnection
  },
  {
    path: '/game',
    component: ViewGame
  }
]

export default new VueRouter({
  routes,
  base: '/',
  mode: 'history'
})
