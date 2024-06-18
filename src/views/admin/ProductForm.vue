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
      <label for="product_type">Loại Sản Phẩm:</label>
      <input type="text" id="product_type" v-model="formData.product_type" class="form-control" required>
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
      baseURL: 'http://localhost:8000', // Đường dẫn cơ sở của API
      formData: {
        name: '',
        quantity: 0,
        price: 0,
        description: '',
        product_type: '',
        image: null // Để lưu trữ tệp hình ảnh được chọn
      },
      errorMessage: ''
    };
  },
  methods: {
    addProduct() {
      // Tạo đối tượng FormData để xử lý tải tệp
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('price', this.formData.price);
      formData.append('description', this.formData.description);
      formData.append('product_type', this.formData.product_type);
      formData.append('quantity', this.formData.quantity);
      formData.append('image', this.formData.image); // Thêm tệp hình ảnh vào FormData

      // Gửi yêu cầu POST đến API endpoint
      axios.post(`${this.baseURL}/api/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Thiết lập header cho multipart form-data
        }
      })
      .then(response => {
        console.log('Product added:', response.data);
        // Đặt lại dữ liệu form sau khi gửi thành công
        this.formData = {
          name: '',
          quantity: 0,
          price: 0,
          description: '',
          product_type: '',
          image: null
        };
        this.$router.push('/admin/product-management'); // Chuyển hướng sau khi thêm sản phẩm thành công
      })
      .catch(error => {
        console.error('Error adding product:', error);
        this.errorMessage = 'Thêm sản phẩm thất bại. Vui lòng thử lại.'; // Hiển thị thông báo lỗi nếu yêu cầu thất bại
      });
    },
    handleFileUpload(event) {
      this.formData.image = event.target.files[0]; // Lưu trữ tệp hình ảnh được chọn vào formData.image
    }
  }
};
</script>
<style scoped>
/* CSS cho form đăng ký */
.product-container {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 40px); /* 40px là khoảng cách lề ở hai bên */
  max-width: 400px;
  padding: 20px;
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
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
  font-size: 1rem;
}

.btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>
