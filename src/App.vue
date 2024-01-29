<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<style>
#app {
  font-family: 'Outfit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
  max-width: 100vw;
}
</style>
