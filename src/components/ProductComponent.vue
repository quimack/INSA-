<template>
  <div @show-login="showLogin" class="card">
    <header class="img-container" :class="{ 'default-img': !img }">
      <img
        :src="img ? img : '/img/no-img.png'"
        alt="imagen producto"
        class="img-product"
        :class="{ 'default-img': !img }"
      />
    </header>
    <main class="">
      <h4>{{ name }}</h4>
      <div class="price">$ {{ price }}</div>
    </main>
    <footer>
      <div class="btn-actions">
        <button @click="isUserLogged() ? addProduct() : $emit('openLogin')" class="btn">
          <span v-if="!isProductAdded()">AGREGAR</span>
          <span v-if="isProductAdded()">+</span>
        </button>

        <button v-if="isUserLogged && isProductAdded()" @click="subtractProduct()" class="btn">
          <span v-if="isProductAdded()">-</span>
        </button>
      </div>

      <div class="detail" v-if="isProductAdded()">Cantidad: {{ getQuantity() }}</div>
    </footer>
  </div>
</template>

<script>
import { useOrderStore } from '@/stores/orderState'

export default {
  props: ['img', 'code', 'name', 'description', 'price', 'categorie', 'subcategorie', 'uxpack'],
  data() {
    return {
      showLogin: false,
      orderStore: useOrderStore()
    }
  },
  methods: {
    isUserLogged() {
      return !!localStorage.getItem('userLogged')
    },
    isProductAdded() {
      return !!this.orderStore.$state.products.some((p) => p.art_code === this.code)
    },
    addProduct() {
      this.orderStore.addProduct({
        name: this.name,
        code: this.code,
        price: this.price
      })
    },
    subtractProduct() {
      let product = {}
      if (this.orderStore.$state.products.some((p) => p.art_code === this.code)) {
        product = this.orderStore.$state.products.find((p) => p.art_code === this.code)
        if (product.quantity > 1) {
          this.orderStore.subtractProduct(this.code)
        } else {
          this.orderStore.deleteProduct(this.code)
        }
      } else {
        this.orderStore.deleteProduct(this.code)
      }
    },
    getQuantity() {
      return this.orderStore.products.find((p) => p.art_code === this.code).quantity
    }
  }
}
</script>

<style scoped>
.card {
  width: 19vw;
  height: 30em;
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

main {
  justify-content: space-between;
  padding-block: 0.8em;
  height: 24%;
}

footer {
  justify-content: flex-start;
  padding-top: 0.8em;
  height: 19%;
}

.img-container {
  height: 57%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.img-product {
  border-radius: 16px 16px 0 0;
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: center;
}
.img-container.default-img {
  justify-content: center;
}
.img-product.default-img {
  width: 6em;
}

h4 {
  padding: 0.3em;
  color: #023e8a;
  text-align: center;
}
.price {
  color: #097fff;
  font-size: 1.3em;
}
.detail {
  color: #656565;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
  padding-top: 0.5em;
}

.btn-actions {
  display: flex;
  justify-content: space-around;
}
.btn {
  position: relative;
  background: var(--orange-soda);
  color: var(--white);
  font-family: var(--ff-poppins);
  font-size: var(--fs-5);
  text-transform: var(--text-transform, capitalize);
  border: 1px solid var(--orange-soda);
  padding: 10px 20px;
  z-index: 1;
  border-radius: 5px;
  margin: 0 1em;
}

.btn:hover {
  --orange-soda: hsl(7, 72%, 46%);
}
</style>
