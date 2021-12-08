import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

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
    path: '/misMuestras',
    name: 'MyExpositions',
    component: () => import(/* webpackChunkName: "routines" */ '../views/MyExpositions.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/exposiciones/:slug',
    name: 'Exposition',
    props: true,
    component: () => import(/* webpackChunkName: "exposition" */ '../views/Exposition.vue'),
  },
  {
    path: '/muestrasvirtuales',
    name: 'VirtualTours',
    component: () => import(/* webpackChunkName: "exposition" */ '../views/VirtualTours.vue'),
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "help" */ '../views/Contact.vue'),
  },
  {
    path: '/registro',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/registratumuestra',
    name: 'AddExposition',
    component: () => import(/* webpackChunkName: "Register" */ '../views/AddExposition.vue'),
    meta: { requiresAuth: true },
    props: true,
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
    path: "/NotFound",
    alias: "*",
    name: "NotFound",
    component: () =>
        import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },

]

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("USER");
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!user) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router

