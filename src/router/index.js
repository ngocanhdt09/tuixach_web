import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Customer from '../views/Customer.vue';
import Productlist from '../components/product/Productlist.vue';
import Productdetail from '@/components/product/Productdetail.vue';
import LoginAdmin from '../views/admin/LoginAdmin.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import ProductManagement from '../views/admin/ProductManagement.vue';
import ProductForm from '../views/admin/ProductForm.vue';
import Category1 from '@/components/category/Category1.vue';
import UpdateProduct from '../views/admin/UpdateProduct.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
  },
  {
    path: '/products',
    name: 'products',
    component: Productlist,
  },
  {
    path: '/products/:id',
    name: 'productdetail',
    component: Productdetail,
    props: true,
  },
  {
    path: '/admin/login',
    name: 'adminlogin',
    component: LoginAdmin,
    meta: { isAdmin: true }, // Đánh dấu route admin
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, requiresAdmin: true, isAdmin: true }, // Đánh dấu route admin
  },
  {
    path: '/admin/product-management',
    name: 'ProductManagement',
    component: ProductManagement,
    meta: { requiresAuth: true, requiresAdmin: true, isAdmin: true }, // Đánh dấu route admin
  },
  {
    path: '/admin/product-form',
    name: 'ProductForm',
    component: ProductForm,
    meta: { requiresAuth: true, requiresAdmin: true, isAdmin: true }, // Đánh dấu route admin
  },
  {
    path: '/admin/product/:id/edit',
    name: 'updateproduct',
    component: UpdateProduct,
    meta: { requiresAuth: true, requiresAdmin: true, isAdmin: true }, // Đánh dấu route admin
  },
  {
    path: '/category1',
    name: 'Category1',
    component: Category1,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAdminRoute = to.path.startsWith('/admin'); // Kiểm tra xem route có phải là các route admin không

  if (isAdminRoute) {
    // Nếu là route admin, sử dụng HeaderAdmin
    document.title = 'Admin Page';
    // Bạn có thể set document.title cho các trang admin
    next();
  } else {
    // Nếu không phải route admin, sử dụng Header chung
    document.title = 'User Page';
    next();
  }
});


// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!token) {
//       next('/login');
//     } else {
//       if (to.matched.some(record => record.meta.isAdmin)) {
//         if (user && user.role === 'admin') {
//           next();
//         } else {
//           next('/login');
//         }
//       } else {
//         next();
//       }
//     }
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   // Kiểm tra xem route có yêu cầu đăng nhập không
//   // if (to.matched.some(record => record.meta.requiresAuth)) {
//   //   // Kiểm tra xem người dùng đã đăng nhập chưa
//   //   if (!localStorage.getItem('userToken')) {
//   //     // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
//   //     next('/login');
//   //   } else {
//   //     // Kiểm tra vai trò của người dùng từ localStorage
//   //     const userRole = localStorage.getItem('userRole');
      
//       // Nếu route yêu cầu là admin và người dùng có vai trò là admin
//       if (to.matched.some(record => record.meta.requiresAdmin) && userRole === 'admin') {
//         // Chuyển hướng đến trang admin/dashboard
//         next('/admin/dashboard');
//       } else {
//         // Tiếp tục vào route hiện tại
//         next();
//       }
//     }
//   } else {
//     // Route không yêu cầu đăng nhập, cho phép tiếp tục
//     next();
//   }
// });
// ;

export default router
