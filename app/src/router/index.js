import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'Layout' */'@/views/Layout.vue'),
    children: [
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
