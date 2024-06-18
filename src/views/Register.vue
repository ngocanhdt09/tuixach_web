<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="text-center mb-4">Đăng ký</h2>
      <div class="form-group">
        <label for="email">Tài khoản:</label>
        <input type="text" id="email" v-model="email" class="form-control" placeholder="Nhập địa chỉ email" required>
      </div>
      <div class="form-group">
        <label for="name">Tên:</label>
        <input type="text" id="name" v-model="name" class="form-control" placeholder="Nhập tên của bạn" required>
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" v-model="password" class="form-control" placeholder="Nhập mật khẩu" required>
      </div>
      <!-- Uncomment to include confirm password field -->
      <!-- <div class="form-group">
        <label for="confirmPassword">Xác nhận mật khẩu:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" placeholder="Nhập lại mật khẩu" required>
      </div> -->
      <button @click="register" class="btn btn-primary btn-block">Đăng ký</button>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
      <p class="text-center mt-2">Bạn đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      this.errorMessage = ''; // Reset lỗi trước khi thực hiện đăng ký

      // Kiểm tra định dạng email (nếu cần)
      // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailPattern.test(this.email)) {
      //   this.errorMessage = 'Định dạng email không hợp lệ. Vui lòng nhập lại.';
      //   return;
      // }

      // Kiểm tra mật khẩu và mật khẩu xác nhận (nếu cần)
      // if (this.password !== this.confirmPassword) {
      //   this.errorMessage = 'Mật khẩu và xác nhận mật khẩu không khớp.';
      //   return;
      // }

      try {
        // Gửi request đăng ký tài khoản
        await axios.post('http://localhost:8000/api/register', {
          email: this.email,
          password: this.password,
          name: this.name
        });
        console.log('Đăng ký thành công!');
        // Điều hướng người dùng đến trang đăng nhập sau khi đăng ký thành công
        this.$router.push('/login');
      } catch (error) {
        console.error('Đăng ký thất bại:', error);
        this.errorMessage = 'Đăng ký không thành công. Vui lòng kiểm tra lại thông tin đăng ký của bạn.';
      }
    }
  }
};
</script>

<style scoped>
/* CSS cho form đăng ký */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px; /* Khoảng cách từ các bên */
}

.register-box {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-box h2 {
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
