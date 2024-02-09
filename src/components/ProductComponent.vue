<template>
  <div @show-login="showLogin" class="card">
    <header class="img-container">
      <img
        :src="img ? img : '/img/no-img.png'"
        alt="imagen producto"
        class="img-product"
        :class="{ 'default-img': !img }"
      />
    </header>
    <main>
      <h3>{{ name }}</h3>
      <p class="detail">{{ description }}</p>
    </main>
    <footer class="price">
      <div>$ {{ price }}</div>
      <div class="detail" v-if="uxpack">unidades x pack: {{ uxpack }}</div>
      <button @click="$emit('openLogin')" class="btn btn-primary">AGREGAR</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: ['img', 'name', 'description', 'price', 'categorie', 'subcategorie', 'uxpack'],
  data() {
    return {
      showLogin: false
    }
  },
}
</script>

<style scoped>
.card {
  width: 16em;
  height: 22em;
  border-radius: 16px;
  margin: 1.3em 1.3em 3em 1.3em;
  box-shadow: var(--shadow-1);
}

main,
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-container {
  height: 12em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.img-product {
  border-radius: 16px 16px 0 0;
  /* width: 5em; */
  max-height: 12em;
}
.default-img {
  width: 6em;
}
h3 {
  padding: 0.3em;
  color: #023e8a;
  text-align: center;
}
.price {
  color: #097fff;
  font-size: 1.3em;
  padding: 0.3em;
}
.detail {
  color: #656565;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
}
</style>
