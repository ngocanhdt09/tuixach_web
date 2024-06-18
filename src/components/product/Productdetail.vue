<template>
  <div class="product-detail-container">
    <div v-if="product" class="product-detail-content">
      <div class="product-detail-top">
        <div class="product-detail-image">
          <img :src="getFullImageUrl(product.image)" :alt="product.name">
        </div>
        <div class="product-detail-info">
          <h2 class="product-detail-name">{{ product.name }}</h2>
          <div class="product-detail-price">{{ formatCurrency(product.price) }}</div>
          <h2 class="product-detail-name">Chất liệu : {{ product.product_type }}</h2>
          <h2 class="product-detail-name">{{ product.manufacturer }}</h2>
          <div class="product-detail-quantity">
            <label for="quantity">Số lượng:</label>
            <input type="number" id="quantity" v-model.number="quantity" min="1">
          </div>
          <button class="btn btn-primary btn-add-to-cart" @click="addToCart(product)">Thêm Vào Giỏ Hàng </button>
        </div>
      </div>
      <div class="product-detail-description">
        <h3>Mô tả:</h3>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-return-policy">
        <h3>Chính sách đổi trả:</h3>
        <p>Chúng tôi chấp nhận đổi trả hàng trong vòng 30 ngày kể từ ngày mua hàng. Vui lòng liên hệ dịch vụ khách hàng để được hỗ trợ.</p>
      </div>
    </div>
    <div v-else class="loading">
      Loading...
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      product: null,
      baseURL: 'http://localhost:8000',
      quantity: 0,
    };
  },
  watch: {
    id(newVal, oldVal) {
      this.fetchProduct(newVal);
    },
  },
  mounted() {
    this.fetchProduct(this.id);
  },
  methods: {
    fetchProduct(id) {
      axios.get(`${this.baseURL}/api/products/${id}`)
        .then(response => {
          this.product = response.data;
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    },
    addToCart(product) {
      // Implement your addToCart functionality here
      console.log('Adding to cart:', product);
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
.product-detail-container {
  width: 100%;
  height: 100%;
  padding: 0 20px; /* Có thể điều chỉnh theo ý muốn */
}

.product-detail-content {
  max-width: 100%;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.product-detail-top {
  display: flex;
  align-items: flex-start;
}

.product-detail-image {
  flex: 0 0 40%;
  margin-right: 20px;
}

.product-detail-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.product-detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-detail-name {
  margin-bottom: 10px;
  color: #333333;
}

.product-detail-price {
  font-size: 20px; /* Tương đương với 1.5rem */
  font-weight: bold;
  color: #ee4d2d;
  margin-bottom: 10px;
}

.btn-add-to-cart {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 20px; /* Tương đương với 1.5rem */
  background-color: #ee4d2d;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-add-to-cart:hover {
  background-color: #ff6e4a;
  transform: scale(1.05);
}

.btn-add-to-cart:focus {
  outline: none;
}

.product-detail-description {
  margin-top: 20px;
}

.product-detail-description h3 {
  font-size: 28px; /* Tương đương với 1.75rem */
  margin-bottom: 10px;
  color: #333333;
}

.product-detail-description p {
  font-size: 24px; /* Tương đương với 1.5rem */
  line-height: 1.8;
  color: #555555;
}

.product-return-policy {
  margin-top: 20px;
}

.product-return-policy h3 {
  font-size: 28px; /* Tương đương với 1.75rem */
  margin-bottom: 10px;
  color: #333333;
}

.product-return-policy p {
  font-size: 24px; /* Tương đương với 1.5rem */
  line-height: 1.8;
  color: #555555;
}

.product-detail-quantity {
  margin-top: 10px;
}

.product-detail-quantity label {
  font-size: 24px; /* Tương đương với 1.5rem */
  color: #333333;
  margin-right: 10px;
}

.product-detail-quantity input[type="number"] {
  width: 60px;
  padding: 8px;
  font-size: 24px; /* Tương đương với 1.5rem */
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.product-detail-quantity input[type="number"]:focus {
  border-color: #ee4d2d;
}
</style>
