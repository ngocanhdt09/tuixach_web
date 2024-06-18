import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Customer from '../views/Customer.vue';
import Productlist from '../components/product/Productlist.vue';
import Productdetail from '@/components/product/Productdetail.vue';
import LoginAdmin from '../views/admin/LoginAdmin.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import ProductManagement from '../views/admin/ProductManagement.vue';
import ProductForm from '../views/admin/ProductForm.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    { path: '/login-after-register', 
      name: 'login-after-register',
      component: Login 
    },
    {
      path: '/products',
      name: 'products',
      component: Productlist
    },
    {
      path: '/products/:id', // Dynamic route parameter for product id
      name: 'productdetail',
      component: Productdetail,
      props: true // Pass route params as props to ProductDetail component
    },
    {
      path: '/admin/login',
      name: 'adminlogin',
      component: LoginAdmin
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/admin/product-management',
      name: 'ProductManagement',
      component: ProductManagement
    },
    {
      path: '/admin/product-form',
      name: 'ProductForm',
      component: ProductForm
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/admin/login');
    } else {
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user && user.role === 'admin') {
          next();
        } else {
          next('/admin/login');
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router
