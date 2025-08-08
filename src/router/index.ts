import { createRouter, createWebHistory } from 'vue-router'
// Route-level code-splitting for better TTI
const PortfolioView = () => import('../views/PortfolioView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/InfoView.vue'),
    },
    // Redirect any unknown routes to portfolio
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top on route change
    if (to.hash) {
      // If there's a hash, scroll to that element
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    // Always scroll to top for route changes
    return { top: 0 }
  },
})

export default router 