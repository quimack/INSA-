<template>
  <div class="card">
    <header class="img-container">
      <img :src="imgSrc" alt="imagen producto" width="20%" />
    </header>
    <main>
      <title>{{ name }}</title>
      <p>{{ description }}</p>
    </main>
    <footer>
      {{ price }}
    </footer>
  </div>
</template>

<script>
export default {
  name: "VueProduct",
  props: ["imgSrc", "name", "description", "price"],
};
</script>
