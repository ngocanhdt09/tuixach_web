<template>
   <div>
      <h2>Đăng nhập</h2>
      <form @submit="login">
        <label for="username">Tài khoản:</label>
        <input type="text" id="username" v-model="username">
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" v-model="password">
        <button type="submit">Đăng nhập</button>
      </form>
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
           console.log ('hello');
            axios.post('http://localhost:8000/api/login', {
             email: this.username,
             password: this.password
           })
           .then (response => {
            console.log(response.data);
           }).catch(error =>{
            console.log('Đăng nhập thất bại',error);
           }

           )
           // Xử lý kết quả khi đăng nhập thành công
        //    console.log(response.data);
         } catch (error) {
           this.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn.';
         }
       }
     }
   };
   </script>