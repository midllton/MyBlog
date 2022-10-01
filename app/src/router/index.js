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
          },
          {
            path: 'type',
            component: () => import(/* webpackChunkName: 'ManageType' */'@/views/admin/ManageType.vue')
          },
          {
            path: 'addType',
            component: () => import(/* webpackChunkName: 'AddType' */'@/views/admin/AddType.vue')
          }
        ]
      },
      {
        path: 'article/:id',
        component: () => import(/* webpackChunkName: 'Article' */'@/components/Article.vue')
      },
      {
        path: 'it',
        component: () => import(/* webpackChunkName: 'Type1' */'@/views/Type1.vue')
      },
      {
        path: 'book',
        component: () => import(/* webpackChunkName: 'Type1' */'@/views/Type1.vue')
      },
      {
        path: 'research',
        component: () => import(/* webpackChunkName: 'Type1' */'@/views/Type1.vue')
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
