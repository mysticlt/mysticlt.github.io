import { createRouter, createWebHashHistory } from 'vue-router'
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
  history: createWebHashHistory(), // 改为 Hash 模式
  routes,
})

export default router