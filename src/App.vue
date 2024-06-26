<template>
  <div id="app" class="wrapper">
    <Header v-if="!isRouteAdmin($route.meta)" />
    <HeaderAdmin v-else />
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/layout/Header.vue';
import HeaderAdmin from './components/layout/HeaderAdmin.vue'; // Import HeaderAdmin

export default {
  name: 'App',
  components: {
    Header,
    HeaderAdmin, // Đăng ký HeaderAdmin component
  },
  setup() {
    const route = useRoute();

    const isRouteAdmin = (meta) => {
      // Kiểm tra xem route có phải là admin hay không dựa trên meta data
      return meta && meta.isAdmin === true;
    };

    return {
      isRouteAdmin,
    };
  },
};
</script>

<style>
/* Global styles */
html, body, #app {
  height: 100%;
}

.wrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Styles for Header and Footer can be scoped or global */
</style>
