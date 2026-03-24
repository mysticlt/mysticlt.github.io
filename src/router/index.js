import { createRouter, createWebHistory } from 'vue-router'
import OptVerseApplication from '../views/OptVerseApplication.vue'
import Thanks from '../views/Thanks.vue'

const routes = [
  {
    path: '/',
    name: 'OptVerseApplication',
    component: OptVerseApplication
  },
  { path: '/thanks', name: 'thanks', component: Thanks }
]

const router = createRouter({
  history: createWebHistory('/'),  // ← 添加 base 路径
  routes
})
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

export default router