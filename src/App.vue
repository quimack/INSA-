<script>
import { RouterView } from 'vue-router'
import FooterComponent from '@/components/FooterComponent.vue'
import NewHeader from './components/NewHeader.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import OrderModal from './components/OrderModal.vue'

export default {
  components: {
    NewHeader,
    RouterView,
    LoginComponent,
    FooterComponent,
    OrderModal
  },
  data() {
    return {
      showLogin: false,
      showOrderModal: false // Agregar estado para controlar la visibilidad del modal OrderModal
    }
  },
  methods: {
    handleLogin() {
      this.showLogin = !this.showLogin
    },
    handleOrderModal() {
      this.showOrderModal = true // Mostrar el modal OrderModal cuando se recibe el evento
    }
  }
}
</script>

<template>
  <div>
    <NewHeader :showLogin="false" @openLogin="handleLogin" @openOrderModal="handleOrderModal" />
    <RouterView />
    <vue-final-modal v-model="showLogin" classes="modal-container" content-class="modal-content">
      <LoginComponent :showLogin="true" />
    </vue-final-modal>
    <vue-final-modal
      v-model="showOrderModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <OrderModal :showOrderModal="true" />
    </vue-final-modal>
    <FooterComponent />
  </div>
</template>

<style scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.modal-content) {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  min-width: 20vw;
  max-width: 400px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
.dark-mode div:deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
