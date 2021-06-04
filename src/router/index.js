import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/Home.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/Home.vue')
      }
    ]
  },
  {
    path: '/example',
    name: 'example',
    component: () => import('../views/example/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
