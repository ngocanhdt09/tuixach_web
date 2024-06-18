<template>
  <div class="home-view">
    <!-- Banner -->
    <div class="banner">
      <img src="/src/assets/banner.png" alt="Banner" class="img-fluid">
    </div>

    <!-- Thông tin nổi bật -->
    <section class="highlighted-info">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="highlighted-item">
              <h3>Túi đeo chéo</h3>
              <p>Túi bao tử là một loại túi xách thời trang được thiết kế để đeo chéo qua vai hoặc đeo chéo qua ngực.</p>
              <router-link to="/category1" class="btn btn-primary">Xem thêm</router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="highlighted-item">
              <h3>Túi Bao Tử</h3>
              <p>Túi Bao Tử là một loại túi xách thời trang nhỏ gọn, thường có hình dáng hộp chữ nhật hoặc bầu dục, có dây đeo dài để đeo chéo qua vai hoặc qua ngực. </p>
              <router-link to="/category2" class="btn btn-primary">Xem thêm</router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="highlighted-item">
              <h3>Túi bì thư</h3>
              <p>Túi bì thư là một loại túi nhỏ, thường có hình dáng hẹp và dài tương tự như một bì thư. </p>
              <router-link to="/category3" class="btn btn-primary">Xem thêm</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Các danh mục sản phẩm
    <section class="product-categories">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="category-item">
              <h3>Danh mục 1</h3>
              <p>Mô tả ngắn gọn về danh mục 1.</p>
              <router-link to="/category1" class="btn btn-outline-primary">Xem sản phẩm</router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="category-item">
              <h3>Danh mục 2</h3>
              <p>Mô tả ngắn gọn về danh mục 2.</p>
              <router-link to="/category2" class="btn btn-outline-primary">Xem sản phẩm</router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="category-item">
              <h3>Danh mục 3</h3>
              <p>Mô tả ngắn gọn về danh mục 3.</p>
              <router-link to="/category3" class="btn btn-outline-primary">Xem sản phẩm</router-link>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Sản phẩm nổi bật -->
    <section class="featured-products">
      <div class="container">
        <h2 class="section-title">Sản phẩm nổi bật</h2>
        <div class="row">
          <div v-for="product in featuredProducts" :key="product.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100">
              <img :src="product.imageUrl" class="card-img-top" :alt="product.name">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <div class="text-center">
                  <router-link :to="'/product/' + product.id" class="btn btn-sm btn-outline-secondary">Chi tiết</router-link>
                  <button @click="addToCart(product)" class="btn btn-sm btn-primary">Thêm vào giỏ hàng</button>
                </div>
                <p class="card-text text-muted">{{ formatCurrency(product.price) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {
      featuredProducts: [], // Đưa vào dữ liệu sản phẩm nổi bật
      // Các dữ liệu khác và phương thức của bạn
    };
  },
  mounted() {
    this.fetchFeaturedProducts(); // Gọi phương thức lấy sản phẩm nổi bật khi mount component
  },
  methods: {
    fetchFeaturedProducts() {
      axios.get(`${this.baseURL}/api/featured-products`)
        .then(response => {
          this.featuredProducts = response.data.map(product => ({
            ...product,
            imageUrl: `${this.baseURL}/${product.image}`,
          }));
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu sản phẩm nổi bật:', error);
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
/* CSS cho HomeView và các phần khác */
.home-view {
  background-color: #f5f5f5;
  padding-bottom: 60px; /* Đảm bảo khoảng cách đủ để footer không bị chồng lên */
  height: 100vh; /* Chiều cao 100% của viewport */
  width: 100%; /* Chiều rộng 100% */

  /* Đảm bảo loại bỏ margin và padding mặc định của body */
  margin: 0;
  padding: 0;
}

.banner img {
  width: 100%;
  height: auto;
}

.highlighted-info {
  background-color: #fff;
  padding: 40px 0;
}

.highlighted-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
}

.highlighted-item h3 {
  font-size: 24px;
  color: #333;
}

.product-categories {
  padding: 40px 0;
}

.category-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
}

.category-item h3 {
  font-size: 24px;
  color: #333;
}

.featured-products {
  padding: 40px 0;
}

.card {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-text {
  color: #666;
}

.card-body {
  padding: 20px;
}
</style>
