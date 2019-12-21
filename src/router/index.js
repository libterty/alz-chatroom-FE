import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '../views/NotFound.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/chatroom' 
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: () => import('../views/Chatroom.vue')
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/restaurants'
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes
})

export default router
