<template>
  <div v-if="showOrderModal" class="modal">
    <div class="modal-content">
      <h2>Resumen de la compra</h2>
      <div class="order-header">
        <div class="order-column">Categoría</div>
        <div class="order-column">Producto</div>
        <div class="order-column">Precio</div>
        <div class="order-column">Cantidad</div>
        <div class="order-column"></div>
      </div>
      <div class="order-item">
        <div class="order-column">
          <img src="../assets/images/imagen1.jpg" alt="Categoría" class="category-icon" />
        </div>
        <div class="order-column">ALIAFOR ADAP M14 A MANDRIL HOLE NEXT **</div>
        <div class="order-column">$10</div>
        <div class="order-column">2</div>
        <div class="order-column">
          <div class="display-flex">
            <ion-icon name="remove-circle-outline" class="remove-icon"></ion-icon>
            <ion-icon name="add-circle-outline" class="add-icon"></ion-icon>
          </div>
        </div>
      </div>
      <div class="order-item">
        <div class="order-column">
          <img src="../assets/images/imagen1.jpg" alt="Categoría" class="category-icon" />
        </div>
        <div class="order-column">ALIAFOR STONE FIRE T 9" ALMA PLANA**</div>
        <div class="order-column">$15</div>
        <div class="order-column">1</div>
        <div class="order-column">
          <div class="display-flex">
            <ion-icon name="remove-circle-outline" class="remove-icon"></ion-icon>
            <ion-icon name="add-circle-outline" class="add-icon"></ion-icon>
          </div>
        </div>
      </div>
      <div class="total"><strong>Total: $300.500</strong></div>
      <div class="confirm-container">
        <button class="confirm-button" @click="confirmOrder">Confirmar Pedido</button>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    removeItem(index) {
      this.orderItems.splice(index, 1)
    },
    addItem(index) {
      // Aquí podrías implementar la lógica para agregar un producto, por ejemplo, duplicando el elemento actual o aumentando su cantidad.
      // En esta versión de ejemplo, simplemente estoy duplicando el producto en la posición actual.
      this.orderItems.splice(index + 1, 0, JSON.parse(JSON.stringify(this.orderItems[index])))
    },
    calculateTotal() {
      return this.orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  }
}
</script>

<style scoped>
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

.confirm-button:hover{
  --orange-soda: hsl(7, 72%, 46%);
}
.display-flex {
  display: flex;
}
.modal {
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  min-width: 60rem !important;
}

.order-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
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

.order-column:first-child {
  flex: 1;
  text-align: center;
}

.category-icon {
  width: 5rem;
  height: 5rem;
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
</style>
