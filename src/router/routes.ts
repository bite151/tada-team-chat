import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', name: 'Login', component: () => import('pages/LoginPage.vue') }]
  },
  {
    path: '/chat',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'Chat', component: () => import('pages/ChatPage.vue') }]
  },

  {
    path: '/chat/:room',
    component: () => import('layouts/MainLayout.vue'),
    props: true,
    children: [{ path: '', component: () => import('pages/ChatRoomPage.vue') }]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
