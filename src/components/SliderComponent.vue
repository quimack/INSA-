<template>
  <div class="slider">
    <Carousel :items-to-show="1" :autoplay="3000" :wrap-around="true" pause-autoplay-on-hover>
      <Slide v-for="(image, index) in images" v-bind:key="index">
        <img :src="image" alt="Imagen" class="img" width="100%" />
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const images = ['/img/demo.jpg', '/img/demo2.jpg', ]
</script>

<style scoped>
.slider {
  width: 100vw;
}
.img {
  max-height: 50vh;
  object-fit: cover;
}
</style>
