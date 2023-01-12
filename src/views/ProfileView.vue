<script setup>
import Navbar from '../components/Navbar.vue'
import Profile from '../components/Profile.vue'
import Footer from '../components/Footer.vue';
</script>

<template>
    <div class="w-full">
        <Navbar :showSearchTreks=false />
        <Profile />
        <Footer />
    </div>
</template>
  
  