<template>
  <div class="product-list">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <h2 class="section-title">Danh sách sản phẩm</h2>
      <ul class="product-list-items">
        <li v-for="product in paginatedProducts" :key="product.id" class="product-list-item">
          <router-link :to="'/product/' + product.id" class="product-link">
            <div class="product-frame">
              <img :src="product.imageUrl" class="product-img" :alt="product.name">
            </div>
          </router-link>
          <div class="product-details">
            <router-link :to="'/product/' + product.id" class="product-link">
              <h5 class="product-name">{{ product.name }}</h5>
            </router-link>
            <p class="product-manufacturer">Nhà sản xuất: {{ product.manufacturer }}</p>
            <p class="product-price">{{ formatCurrency(product.price) }}</p>
            <div class="product-actions">
              <router-link :to="'/product/' + product.id + '/edit'" class="btn btn-outline-primary">Sửa</router-link>
              <button @click="deleteProduct(product.id)" class="btn btn-outline-danger">Xóa</button>
            </div>
          </div>
        </li>
      </ul>
      <nav aria-label="Pagination">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="previousPage" :disabled="currentPage === 1">Trang trước</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Trang sau</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="add-product-button">
    <router-link to="/admin/product-form" class="btn btn-primary">Thêm sản phẩm</router-link>
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
      baseURL: 'http://localhost:8000', // Thay đổi thành URL cơ sở của bạn
      currentPage: 1,
      pageSize: 5, // Số sản phẩm mỗi trang
    };
  },
  computed: {
    // Tính toán sản phẩm cho từng trang
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.products.slice(startIndex, startIndex + this.pageSize);
    },
    // Tính toán tổng số trang
    totalPages() {
      return Math.ceil(this.products.length / this.pageSize);
    },
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
            imageUrl: `${this.baseURL}/${product.image}`, // Xây dựng URL đầy đủ cho hình ảnh
          }));
          this.loading = false;
        })
        .catch(error => {
          console.error('Lỗi khi lấy danh sách sản phẩm:', error);
          this.loading = false;
        });
    },
    deleteProduct(productId) {
      if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        axios.delete(`${this.baseURL}/api/products/${productId}`)
          .then(() => {
            // Xóa sản phẩm khỏi danh sách
            this.products = this.products.filter(product => product.id !== productId);
          })
          .catch(error => {
            console.error('Lỗi khi xóa sản phẩm:', error);
          });
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
<style scoped>
.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  position: sticky;
  top: 60px;
  z-index: 999;
  left: 20px;
  color: #333;
}

.product-list {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.product-list-items {
  list-style: none;
  padding: 0;
}

.product-list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-list-item:hover {
  transform: translateY(-5px);
}

.product-frame {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  margin-right: 1rem;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-list-item:hover .product-img {
  transform: scale(1.05);
}

.product-details {
  flex: 1;
}

.product-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.product-manufacturer {
  margin-bottom: 0.5rem;
  color: #666;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
}

.product-actions {
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}

.btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #fff;
}

.add-product-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
}

.page-link:hover {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}
</style>
