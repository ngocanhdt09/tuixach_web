<template>
   <div>
      <h2>Đăng nhập</h2>
      <label for="username">Tài khoản:</label>
      <input type="text" id="username" v-model="username">
      <label for="password">Mật khẩu:</label>
      <input type="password" id="password" v-model="password">
      <button @click="login">Đăng nhập</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
   <script>
   import axios from 'axios';
   
   export default {
     data() {
       return {
         username: '',
         password: '',
         errorMessage: ''
       };
     },
     methods: {
       async login() {
         try {
          const response = await axios.post('http://localhost:9001/api/login');
          console.log(response.data);
         } catch (error) {
           this.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn.';
         }
       }
     }
   };
   </script>