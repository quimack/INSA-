<template>
  <div v-if="showOrderModal" class="modal">
    <div class="modal-content">
      <!-- Aquí puedes agregar el contenido del modal de resumen de la compra -->
      <h2>Resumen de la compra</h2>
      <!-- Por ejemplo, puedes mostrar los productos comprados, precios, etc. -->
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
    }
  }
}
</script>

<style scoped>

</style>
