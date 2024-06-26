<template>
  <div class="product-container">
    <h2>Thêm Sản Phẩm</h2>
    <div class="form-group">
      <label for="name">Tên Sản Phẩm:</label>
      <input type="text" id="name" v-model="formData.name" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="price">Giá:</label>
      <input type="number" id="price" v-model.number="formData.price" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="description">Mô tả:</label>
      <textarea id="description" v-model="formData.description" class="form-control" rows="4" required></textarea>
    </div>
    <div class="form-group">
      <label for="product_type">Chất Liệu:</label>
      <input type="text" id="product_type" v-model="formData.product_type" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="category_id">Loại Sản Phẩm:</label>
      <select id="category_id" v-model="formData.category_id" class="form-control" required>
        <option value="">Chọn loại sản phẩm</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="quantity">Số lượng:</label>
      <input type="number" id="quantity" v-model.number="formData.quantity" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="image">Hình ảnh:</label>
      <input type="file" id="image" @change="handleFileUpload" class="form-control-file" accept="image/*">
    </div>

    <button @click="addProduct" class="btn btn-primary">Thêm</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      baseURL: 'http://localhost:8000',
      formData: {
        name: '',
        quantity: 0,
        price: 0,
        description: '',
        product_type: '',
        category_id: '',
        image: null
      },
      errorMessage: '',
      categories: []
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios.get(`${this.baseURL}/api/categories`)
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    addProduct() {
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('price', this.formData.price);
      formData.append('description', this.formData.description);
      formData.append('product_type', this.formData.product_type);
      formData.append('category_id', this.formData.category_id);
      formData.append('quantity', this.formData.quantity);
      formData.append('image', this.formData.image);

      axios.post(`${this.baseURL}/api/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Product added:', response.data);
        this.resetForm();
        this.$router.push('/admin/product-management');
      })
      .catch(error => {
        console.error('Error adding product:', error);
        this.errorMessage = 'Thêm sản phẩm thất bại. Vui lòng thử lại.';
      });
    },
    handleFileUpload(event) {
      this.formData.image = event.target.files[0];
    },
    resetForm() {
      this.formData = {
        name: '',
        quantity: 0,
        price: 0,
        description: '',
        product_type: '',
        category_id: '',
        image: null
      };
    }
  }
};
</script>

<style scoped>
.product-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px; /* Font size adjusted */
}

.form-control-file {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: auto;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px; /* Font size adjusted */
}

.btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px; /* Font size adjusted */
}
</style>
