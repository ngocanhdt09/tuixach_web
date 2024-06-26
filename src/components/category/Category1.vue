<template>
  <div class="category-view">
    <h2>Danh mục 1</h2>
    <!-- Hiển thị danh sách sản phẩm của danh mục 1 -->
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product">
        <img :src="getFullImageUrl(product.image)" :alt="product.name" class="product-image">
        <div class="product-details">
          <h3 class="product-name">{{ product.name }}</h3>
          <!-- <p class="product-description">{{ product.description }}</p> -->
          <div class="product-actions">
            <router-link :to="'/product/' + product.id" class="btn btn-sm btn-outline-secondary">Chi tiết</router-link>
            <button @click="addToCart(product)" class="btn btn-sm btn-primary">Thêm vào giỏ hàng</button>
          </div>
          <p class="product-price">{{ formatCurrency(product.price) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Category1',
  data() {
    return {
      products: [],
      baseURL: 'http://localhost:8000', // Đổi URL API của bạn nếu cần thiết
    };
  },
  mounted() {
    this.fetchCategory1Products(); // Gọi API để lấy danh sách sản phẩm của danh mục 1 khi component được mount
  },
  methods: {
    fetchCategory1Products() {
      axios.get(`${this.baseURL}/api/categories/1/products`)
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu sản phẩm danh mục 1:', error);
        });
    },
    addToCart(product) {
      // Xử lý thêm sản phẩm vào giỏ hàng
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    getFullImageUrl(imagePath) {
      return `${this.baseURL}/${imagePath}`;
    },
  },
};
</script>

<style scoped>
/* CSS cho Category1.vue */
.category-view {
  padding: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Điều chỉnh kích thước cột */
  gap: 20px;
}

.product {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease; /* Hiệu ứng transition cho sản phẩm */
}

.product:hover {
  transform: translateY(-5px); /* Hiệu ứng nâng sản phẩm lên khi hover */
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-details {
  margin-top: 10px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-description {
  color: #666;
  margin-bottom: 10px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 16px;
  color: #ee4d2d;
  margin-top: 5px;
}

.btn-primary {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #ee4d2d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #ff6e4a;
}
</style>
