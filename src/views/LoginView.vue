<script setup>
import Navbar from '../components/Navbar.vue';
import Login from '../components/Login.vue'
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="w-full">
    <Navbar :showSearchTreks=false />
    <Login />
    <Footer />
  </div>
</template>
  
  