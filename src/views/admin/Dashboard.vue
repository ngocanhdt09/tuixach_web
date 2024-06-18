<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Đang tải...
    </div>
    <div v-else class="stats row">
      <div class="col-md-3 mb-4">
        <div class="card bg-primary text-white shadow">
          <div class="card-body">
            <i class="fas fa-users fa-3x"></i>
            <h2 class="card-title">Tổng số người dùng</h2>
            <p class="card-text">{{ totalUsers }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card bg-success text-white shadow">
          <div class="card-body">
            <i class="fas fa-boxes fa-3x"></i>
            <h2 class="card-title">Tổng số sản phẩm</h2>
            <p class="card-text"><router-link to="/admin/product-management" class="text-white">{{ totalProducts }}</router-link></p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card bg-warning text-white shadow">
          <div class="card-body">
            <i class="fas fa-shopping-cart fa-3x"></i>
            <h2 class="card-title">Tổng số đơn hàng</h2>
            <p class="card-text">{{ totalOrders }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card bg-danger text-white shadow">
          <div class="card-body">
            <i class="fas fa-dollar-sign fa-3x"></i>
            <h2 class="card-title">Doanh thu</h2>
            <!-- <p class="card-text">{{ totalRevenue | formatCurrency }}</p> -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="error text-center mt-4">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      products: [],
      orders: [],
      revenue: 0,
      loading: false,
      error: ''
    };
  },
  computed: {
    totalUsers() {
      return this.users.length;
    },
    totalProducts() {
      return this.products.length;
    },
    totalOrders() {
      return this.orders.length;
    },
    totalRevenue() {
      return this.revenue;
    }
    // Thêm computed properties khác tại đây nếu cần
  },
  async mounted() {
    try {
      this.loading = true;
      const token = localStorage.getItem('token');

      // Lấy danh sách người dùng
      // const userResponse = await axios.get('http://localhost:8000/api/users', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // this.users = userResponse.data;

      // Lấy danh sách sản phẩm
      const productResponse = await axios.get('http://localhost:8000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.products = productResponse.data;

      // Lấy danh sách đơn hàng
      const orderResponse = await axios.get('http://localhost:8000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.orders = orderResponse.data;

      // Tính toán doanh thu từ các đơn hàng
      this.revenue = this.calculateTotalRevenue(this.orders);

      // Gọi các API khác nếu cần

      this.loading = false;
    } catch (error) {
      this.error = 'Error fetching data';
      console.error('Error fetching data:', error);
      this.loading = false;
    }
  },
  methods: {
    calculateTotalRevenue(orders) {
      // Tính tổng doanh thu từ các đơn hàng
      return orders.reduce((total, order) => total + order.totalAmount, 0);
    }
  },
  filters: {
    formatCurrency(value) {
      // Định dạng số tiền sang đơn vị tiền tệ (ví dụ: VND)
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  border: none;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-text {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.error {
  text-align: center;
  color: red;
  margin-top: 20px;
}
</style>
