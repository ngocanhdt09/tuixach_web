<template>
    <div>
      <h2>Edit Product</h2>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="editedProduct.name">
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="editedProduct.description"></textarea>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model.number="editedProduct.price">
      </div>
      <button @click="updateProduct">Update Product</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editedProduct: {
          id: '',
          name: '',
          description: '',
          price: 0,
        },
      };
    },
    created() {
      // Lấy thông tin sản phẩm từ API khi component được tạo ra
      const productId = this.$route.params.id;
      this.fetchProduct(productId);
    },
    methods: {
      fetchProduct(id) {
        // Gọi API để lấy thông tin sản phẩm từ URL đã chỉ định
        axios.get(`http://localhost:8000/api/products/${id}`)
          .then(response => {
            this.editedProduct = response.data.product;
          })
          .catch(error => {
            console.error('Error fetching product:', error);
          });
      },
      updateProduct() {
        // Gọi API để cập nhật sản phẩm
        axios.put(`http://localhost:8000/api/products/${this.editedProduct.id}`, this.editedProduct)
          .then(response => {
            console.log('Product updated successfully:', response.data);
            // Redirect to product detail page or display a success message
          })
          .catch(error => {
            console.error('Error updating product:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* CSS cho component này */
  
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  textarea,
  input[type="number"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  textarea {
    resize: vertical; /* Cho phép điều chỉnh chiều cao của textarea */
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  </style>
  