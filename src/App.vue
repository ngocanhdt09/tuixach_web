<template>
  <div id="app" class="wrapper">
    <Header />
   
    <router-view />
    
    
  </div>
</template>

<script>
import Header from './components/layout/Header.vue';


export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<!-- <style>
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
</style> -->
