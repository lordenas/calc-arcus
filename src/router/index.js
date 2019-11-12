import Vue from 'vue'
import VueRouter from 'vue-router'
import step1 from '@/views/step1/index.vue'
import step2 from '@/views/step2/index.vue'
import step3 from '@/views/step3/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'step1',
    component: step1
  },
  {
    path: '/step1',
    name: 'step1',
    component: step1
  },
  {
    path: '/step2',
    name: 'step2',
    component: step2
  },
  {
    path: '/step3',
    name: 'step3',
    component: step3
  },
  //{
  //  path: '/about',
  //  name: 'about',
  //  // route level code-splitting
  //  // this generates a separate chunk (about.[hash].js) for this route
  //  // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
/*   console.log(to)
  console.log('from', from)
  console.log(next) */
  if(from.name === null && to.name !== 'step1') {
    next({
			replace: true,
			path: '/step1',
		});
  } else {
    next()
  }
  
})

export default router
