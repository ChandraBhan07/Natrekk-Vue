<script setup>
import Navbar from '../components/Navbar.vue';
import Home from '../components/Home.vue';
import Footer from '../components/Footer.vue';
const emit = defineEmits('search')
</script>

<template>
    <div class="w-full">
        <Navbar @search="(e) => search = e.target.value" />
        <Home :search="search" />
        <Footer />
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: ''
        }
    }
}
</script>
  