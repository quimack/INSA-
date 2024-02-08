<script setup>
import { RouterView } from 'vue-router'
import FooterComponent from '@/components/FooterComponent.vue'
import NewHeader from './components/NewHeader.vue';
</script>

<template>
  <div>
    <NewHeader/>
    <RouterView />
    <FooterComponent />
  </div>
</template>

<style>

</style>
