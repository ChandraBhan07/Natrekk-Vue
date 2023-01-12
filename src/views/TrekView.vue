<script setup>
import Navbar from '../components/Navbar.vue'
import Trek from '../components/Trek.vue'
import Footer from '../components/Footer.vue';
</script>

<template>
    <div class="w-full">
        <Navbar :showSearchTreks=false />
        <div class="mb-28">
            <Trek />
        </div>
        <Footer />
    </div>
</template>
  
  