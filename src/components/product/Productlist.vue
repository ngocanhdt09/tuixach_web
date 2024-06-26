<template>
  <div class="product-list">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <!-- <h2 class="section-title">Danh sách sản phẩm</h2> -->
      <div class="container">
        <div class="card-container">
          <div v-for="product in products" :key="product.id" class="card mb-4 shadow-sm product-card">
            <router-link :to="'/product/' + product.id" class="card-link">
              <div class="card-frame">
              <router-link :to="'/products/' + product.id" >
                <img :src="product.imageUrl" class="card-img-top" :alt="product.name">
                </router-link>
              </div>
            </router-link>
            <div class="card-body">
              <router-link :to="'/product/' + product.id" class="card-link">
                <h5 class="card-title">{{ product.name }}</h5>
              </router-link>
              <p class="card-text">{{ product.manufacturer }}</p>
              <div class="btn-group">
                <router-link :to="'/products/' + product.id" class="btn btn-sm btn-outline-secondary">Chi tiết</router-link>
                <button @click="addToCart(product)" class="btn btn-sm btn-primary">Thêm vào giỏ hàng</button>
              </div>
              <small class="text-muted">{{ formatCurrency(product.price) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      loading: false,
      baseURL: 'http://localhost:8000', // Thay bằng URL cơ sở của bạn
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.loading = true;
      axios.get(`${this.baseURL}/api/products`)
        .then(response => {
          this.products = response.data.map(product => ({
            ...product,
            imageUrl: `${this.baseURL}/${product.image}`, // Tạo URL đầy đủ cho hình ảnh
          }));
          this.loading = false;
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
          this.loading = false;
        });
    },
    addToCart(product) {
      // Xử lý thêm sản phẩm vào giỏ hàng
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
  },
};
</script>

<style scoped>
/* CSS styling cho danh sách sản phẩm */

.container {
  width: 100%; /* Chiều rộng 100% */
  max-width: 100%; /* Giới hạn chiều rộng của container */
  margin: 0 auto; /* Căn giữa container */
  padding: 20px; /* Khoảng cách các phần tử bên trong container */
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Sắp xếp các card theo grid, tự động điều chỉnh kích thước */
  gap: 20px; /* Khoảng cách giữa các card */
}

.card {
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px); /* Hiệu ứng khi hover */
}

.card-img-top {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.1); /* Hiệu ứng phóng to hình ảnh khi hover */
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.btn-group {
  margin-top: 10px;
}

.btn {
  padding: 6px 12px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-outline-secondary {
  color: #6c757d;
  background-color: transparent;
  border-color: #6c757d;
}

.btn-outline-secondary:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
