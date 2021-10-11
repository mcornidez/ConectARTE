import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/miagenda',
    name: 'MyAgenda',
    component: () => import(/* webpackChunkName: "routines" */ '../views/MyAgenda.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "help" */ '../views/Contact.vue'),
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/registratumuestra',
    name: 'AddExposition',
    component: () => import(/* webpackChunkName: "Register" */ '../views/AddExposition.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/miperfil',
    name: 'MyProfile',
    component: () => import(/* webpackChunkName: "details" */ '../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/olvidoclave',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "Register" */ '../views/ForgotPassword.vue')
  },
  {
    path: '/olvidomail',
    name: 'ForgotMail',
    component: () => import(/* webpackChunkName: "Register" */ '../views/ForgotMail.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!store.user) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router

