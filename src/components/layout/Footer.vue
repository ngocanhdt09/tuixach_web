<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <h5>Shopee</h5>
          <ul class="list-unstyled">
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Quy chế</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Hỗ trợ</h5>
          <ul class="list-unstyled">
            <li><a href="#">Trung tâm trợ giúp</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Đổi trả và hoàn tiền</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Theo dõi chúng tôi trên</h5>
          <ul class="list-unstyled social-icons">
            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
            <li><a href="#"><i class="fab fa-youtube"></i></a></li>
          </ul>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col text-center">
          <p>&copy; 2024 Shopee. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.footer .container {
  width: 100%;
  padding: 0;
}

.footer h5 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.footer ul {
  padding-left: 0;
  list-style: none;
}

.footer ul li {
  margin-bottom: 8px;
}

.footer ul li a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer ul li a:hover {
  color: #007bff;
}

.social-icons {
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.social-icons a {
  color: #ff66a6;
  font-size: 24px;
  margin-right: 10px;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #007bff;
}
</style>
