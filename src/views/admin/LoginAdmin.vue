<template>
  <div class="login-container">
    <h2 class="form-title">Đăng Nhập</h2>
    <form >
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" class="input" required>
      </div>
      <div class="form-group">
        <label for="password">Mật Khẩu:</label>
        <input type="password" id="password" v-model="password" class="input" required>
      </div>
      <button @click="login" class="btn">Đăng Nhập</button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password,
        });
        const token = response.data.access_token;
        localStorage.setItem('token', token);

        const userResponse = await axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (userResponse.data.role === 'admin') {
          this.$router.push('/admin/dashboard');
        } else {
          this.error = 'Bạn không có quyền truy cập vào trang admin.';
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        this.error = error.response ? error.response.data.error : 'An error occurred';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  font-size: 16px;
  color: #333;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}
</style>
