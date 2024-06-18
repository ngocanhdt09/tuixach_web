<template>
    <div class="customer-container">
      <div class="user-info-card">
        <h2>Welcome, {{ userInfo.name }}</h2>
        <p>Email: {{ userInfo.email }}</p>
        <!-- Hiển thị thêm thông tin người dùng nếu cần -->
        <button @click="logout" class="btn btn-primary">Đăng xuất</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInfo: {}
      };
    },
    created() {
      // Lấy thông tin người dùng từ localStorage
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
      }
    },
    methods: {
      logout() {
        // Xóa thông tin người dùng và token khỏi localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        // Chuyển hướng đến trang đăng nhập
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .customer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f3f4f6;
  }
  
  .user-info-card {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .user-info-card h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .user-info-card p {
    font-size: 18px;
    color: #666666;
    margin-bottom: 20px;
  }
  
  .btn {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #007bff;
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  