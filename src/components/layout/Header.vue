<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">DTNA SHOP</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Sản phẩm</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">Về chúng tôi</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/services">Dịch vụ</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Liên hệ</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn()">
              <router-link class="nav-link" to="/profile">Thông tin người dùng</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn()">
              <button class="nav-link" @click="logout">Đăng xuất</button>
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link" to="/login">Đăng nhập</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    isLoggedIn() {
      // Kiểm tra xem người dùng đã đăng nhập hay chưa (ví dụ: kiểm tra localStorage)
      const userToken = localStorage.getItem('userToken');
      
      return !!userToken; // Trả về true nếu có userToken, ngược lại false
    },
    logout() {
      // Xóa token khỏi localStorage
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('roleUser');
      // Xóa token khỏi Local Storage và cập nhật trạng thái ngay lập tức
      this.$router.push('/login');
      location.reload(); // Tải lại trang để cập nhật trạng thái ngay lập tức
    }
  }
};
</script>

<style scoped>
/* CSS styling cho header */
/* Giữ nguyên phần CSS styling của bạn */
</style>


<style scoped>
/* CSS styling cho header */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  z-index: 999; /* Đảm bảo hiển thị trên các phần tử khác */
}
.navbar-brand {
  font-size: 24px; /* 1.5rem in rem is approximately 24px in px */
  font-weight: bold;
}
.nav-link {
  color: #333333;
  font-weight: bold;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #007bff;
}
.nav-link.active {
  color: #007bff;
}
.navbar-toggler {
  border: none;
  background-color: transparent;
}
.navbar-collapse {
  justify-content: flex-end;
}
.navbar-nav {
  align-items: center;
}
.nav-item {
  margin-left: 20px; /* Approximately 20px in px */
}
@media (max-width: 991.98px) {
  .navbar-nav {
    margin-top: 10px; /* Approximately 10px in px */
  }
  .nav-item {
    margin: 10px 0; /* Approximately 10px in px */
  }
}
</style>
