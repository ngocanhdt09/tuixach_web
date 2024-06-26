<!-- components/AdminDashboard.vue -->
<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <div class="sidebar">
      <router-link to="/admin/dashboard" class="sidebar-link">Dashboard</router-link>
      <router-link to="/admin/users" class="sidebar-link">Quản lý Người dùng</router-link>
      <router-link to="/admin/product-management" class="sidebar-link">Quản lý Sản phẩm</router-link>
      <router-link to="/admin/orders" class="sidebar-link">Quản lý Đơn hàng</router-link>
    </div>

    <!-- Main content -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  // Nội dung component
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
}

.sidebar-link {
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
}

.sidebar-link:hover {
  background-color: #555;
  padding: 8px;
  border-radius: 4px;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
