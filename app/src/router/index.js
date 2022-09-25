import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'Layout' */'@/views/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: 'Home' */'@/views/Home.vue')
      },
      {
        path: 'admin',
        component: () => import(/* webpackChunkName: 'Admin' */'@/views/admin/Admin.vue'),
        children: [
          {
            path: 'write',
            component: () => import(/* webpackChunkName: 'WriteArticle' */'@/views/admin/WriteArticle.vue')

          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: 'Login' */'@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
