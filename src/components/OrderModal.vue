<template>
  <div v-if="showOrderModal" class="modal">
    <div class="modal-content scroll-y">
      <h2>Resumen de la compra</h2>
      <div class="order-header">
        <div class="order-column"></div>
        <div class="order-column flex-2">Producto</div>
        <div class="order-column flex-half">Precio</div>
        <div class="order-column flex-half">Cantidad</div>
      </div>
      <div class="order-item" v-for="(product, index) in orderStore.products" v-bind:key="index">
        <div class="order-column">
          <img src="/img/no-img.png" alt="Categoría" class="category-icon"/>
        </div>
        <div class="order-column flex-2">{{ product.name }}</div>
        <div class="order-column flex-half">$ {{ product.price }}</div>
        <div class="order-column flex-half">{{ product.quantity }}</div>
      </div>

      <div class="total">
        <strong>Total: $ {{ orderStore.totalPrice }}</strong>
      </div>
      <div class="confirm-container">
        <button class="confirm-button" @click="confirmOrder">Confirmar Pedido</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from '@/stores/orderState'

export default {
  name: 'OrderModal',
  props: {
    showOrderModal: {
      type: Boolean,
      required: true
    },
    orderItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      orderStore: useOrderStore()
    }
  },
  methods: {
    confirmOrder() {
      const user = JSON.parse(localStorage.getItem('userLogged'))
      this.orderStore.initOrder(user?.name)
      console.log(this.orderStore.$state)
    }
  }
}
</script>

<style scoped>
.display-flex {
  display: flex;
}
.modal {
  /* width: 100%; */
  width: 78vw;
  height: 94vh;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  min-width: 60rem !important;
  margin: 0 !important;
}

.modal-content.scroll-y{
  max-width: 1600px !important;
  overflow-y: auto;
  max-height: 100%;
}
.order-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-block: 20px;
  /* margin-bottom: 10px; */
  font-weight: bold;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.order-column {
  flex: 1;
  text-align: center;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.flex-2{
  flex: 2;
}
.flex-half{
  flex: 0.5;
}
.order-column:first-child {
  flex: 1;
  text-align: center;
}

.category-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 0.4rem;
}

.remove-icon,
.add-icon {
  font-size: 24px;
  cursor: pointer;
  color: #888;
}

.remove-icon:hover,
.add-icon:hover {
  color: #f00;
}

.total {
  font-size: 18px;
  margin-top: 20px;
  text-align: right;
}

.confirm-container {
  display: flex;
  width: 100%;
  justify-content: center;
}
.confirm-button {
  background-color: var(--orange-soda);
  color: var(--white);
  font-size: 1rem;
  font-weight: var(--fw-700);
  padding: 10px 15px;
  text-align: center;
}

.confirm-button:hover {
  --orange-soda: hsl(7, 72%, 46%);
}
</style>
