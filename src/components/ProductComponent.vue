<template>
  <div class="card">
    <header class="img-container">
      <img :src="img ? img : '/img/no-img.png'" alt="imagen producto" class="img-product" :class="{ 'default-img': !img }" />
    </header>
    <main>
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </main>
    <footer class="price">
      <div>$ {{ price }}</div>
      <div class="detail" v-if="uxpack">Unidades x pack: {{ uxpack }}</div>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["img", "name", "description", "price", "categorie", "subcategorie", "uxpack"],
};
</script>

<style scoped>

.card{
  width: 16em;
  height: 22em;
  border-radius: 16px;
  margin: 1.3em 1.3em 3em 1.3em;
}
.img-container{
  height: 12em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.img-product{
  border-radius: 16px 16px 0 0;
  /* width: 5em; */
  max-height: 12em;
}
.default-img{
  width: 6em;
}
h3{
  margin: .7em .3em;
  color: #023e8a;
}
.price{
  color: #097fff;
  font-size: 1.3em;
}
.detail{
  color: #656565;
  font-size: .7em;
  font-weight: 400;
}
</style>
