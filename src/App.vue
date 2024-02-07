<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import NewHeader from './components/NewHeader.vue';
import Login from './components/Login.vue';
</script>

<template>
  <div>
    <NewHeader/>
    <login></login>
    <RouterView />
    <FooterComponent />
  </div>
</template>

<style>

</style>
