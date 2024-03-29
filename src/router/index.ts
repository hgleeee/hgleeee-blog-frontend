import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WriteView from '@/views/WriteView.vue'
import PostPageView from '@/views/PostPageView.vue'
import SignupView from '@/views/SignupView.vue'
import PostView from '@/views/PostView.vue'
import CategoryUpdateView from '@/views/CategoryUpdateView.vue'
import UnauthorizedPageView from '@/views/UnauthorizedPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin/write',
      name: 'write',
      component: WriteView
    },
    {
      path: '/posts/:code',
      name: 'posts',
      component: PostPageView
    },
    {
      path: '/join',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/:id',
      name: 'post',
      component: PostView
    },
    {
      path: '/admin/category',
      name: 'category',
      component: CategoryUpdateView,
    },
    {
      path: '/admin/edit/:id',
      name: 'edit',
      component: WriteView,
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedPageView,
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {
      top: 0
    }
  }
})

export default router
