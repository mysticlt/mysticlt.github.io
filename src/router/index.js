import { createRouter, createWebHashHistory } from 'vue-router'
import OptVerseApplication from '../views/OptVerseApplication.vue'
import OptVerseApplicationEn from '../views/OptVerseApplicationEn.vue'
import Thanks from '../views/Thanks.vue'
import ThanksEn from '../views/ThanksEn.vue'

const routes = [
  {
    path: '/',
    name: 'OptVerseApplication',
    component: OptVerseApplication
  },
  {
    path: '/en',
    name: 'OptVerseApplicationEn',
    component: OptVerseApplicationEn
  },
  { path: '/thanks', name: 'thanks', component: Thanks },
  { path: '/en/thanks', name: 'thanksEn', component: ThanksEn }
]

const router = createRouter({
  history: createWebHashHistory(), // 改为 Hash 模式
  routes,
})

export default router