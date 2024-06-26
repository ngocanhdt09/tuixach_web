<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="text-center mb-4">Đăng nhập</h2>
      <div class="form-group">
        <label for="username">Tài khoản:</label>
        <input type="text" id="username" v-model="username" class="form-control" placeholder="Nhập địa chỉ email" required>
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" v-model="password" class="form-control" placeholder="Nhập mật khẩu" required>
      </div>
      <button @click="login" class="btn btn-primary btn-block">Đăng nhập</button>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
      <p class="text-center mt-2">Bạn chưa có tài khoản? <router-link to="/register">Đăng ký ngay</router-link></p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

// // Đặt token CSRF vào trong cookie
// const csrfToken = document.cookie.split('; ')
//   .find(row => row.startsWith('XSRF-TOKEN='))
//   .split('=')[1];

// // Thiết lập mặc định để tự động thêm CSRF token vào các yêu cầu POST
// axios.defaults.headers.post['X-XSRF-TOKEN'] = csrfToken;
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
  this.errorMessage = ''; // Reset lỗi trước khi thử đăng nhập

  // Kiểm tra định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(this.username)) {
    this.errorMessage = 'Định dạng email không hợp lệ. Vui lòng nhập lại.';
    return;
  }
  if (!this.password) {
        this.errorMessage = 'Vui lòng nhập mật khẩu.';
        return;
      }
      

  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: this.username,
      password: this.password
    });

    // Lưu trữ token và thông tin người dùng
    // Lưu trữ token và thông tin người dùng
    localStorage.setItem('userToken', response.data.access_token);
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));

    // Lưu trữ vai trò của người dùng (ví dụ: admin hoặc customer)
    localStorage.setItem('userRole', response.data.user.role);
   // Kiểm tra vai trò để chuyển hướng phù hợp
   if (response.data.user.role === 'admin') {
      // Nếu là admin, chuyển hướng đến trang admin/dashboard
      this.$router.push('/admin/dashboard');
    } else {
      // Nếu là user, chuyển hướng đến trang sản phẩm
      this.$router.push('/products');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      this.errorMessage = error.response.data.error || 'Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn.';
    } else {
      this.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn.';
    }
    console.log('Đăng nhập thất bại', error);
  }
}
  }
}
</script>
<style scoped>
/* CSS cho form đăng nhập */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px; /* Khoảng cách từ các bên */
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.text-danger {
  color: #dc3545;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}

.text-center {
  text-align: center;
  font-size: 14px;
  color: #6c757d;
  margin-top: 10px;
}
</style>