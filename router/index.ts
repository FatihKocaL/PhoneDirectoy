import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/', // path de kullanılan / işareti tanımlama yaparsak o componentin anasayfa olacağını belirtiyoruz.
    name: 'contact', // burada adını belirityoruz
    component: () => import('../views/ContactView.vue'),
    children: [
      {
        path: '/',
        name: 'contactList',
        component: () => import('../components/contact/ContactList.vue'),
      },
      {
        path: '/contactForm',
        name: 'contactForm',
        component: () => import('../components/contact/ContactForm.vue'),
      },
      {
        path: '/contactDetail/:contactId',
        name: 'contactDetail',
        component: () => import('../components/contact/ContactDetail.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
