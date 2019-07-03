import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: Home,
      name: 'Root',
      component: () => { return import(/* webpackChunkName: "selection" */ './views/Selection.vue') },
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => { return import(/* webpackChunkName: "about" */ './views/About.vue') },
    },
    {
      path: '/interface',
      name: 'interface',
      component: () => { return import(/* webpackChunkName: "interface" */ './views/InterfaceSettings.vue') },
    },
    {
      path: '/selection',
      name: 'selection',
      component: () => { return import(/* webpackChunkName: "selection" */ './views/Selection.vue') },
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: () => { return import(/* webpackChunkName: "monitor" */ './views/Monitor.vue') },
    },
    {
      path: '/sequences',
      name: 'sequences',
      component: () => { return import(/* webpackChunkName: "sequences" */ './views/Sequences.vue') },
    },
    {
      path: '/diagnostics',
      name: 'diagnostics',
      component: () => { return import(/* webpackChunkName: "diagnostics" */ './views/Diagnostics.vue') },
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => { return import(/* webpackChunkName: "publish" */ './views/Publish.vue') },
    },
    {
      path: '/test',
      name: 'test',
      component: () => { return import(/* webpackChunkName: "test" */ './views/Test.vue') },
    },
    {
      path: '/controllers',
      name: 'controllers',
      component: () => { return import(/* webpackChunkName: "controllers" */ './views/Controllers.vue') },
    },
    {
      path: '/log',
      name: 'log',
      component: () => { return import(/* webpackChunkName: "log" */ './views/Log.vue') },
    },
  ],
})
