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
      showOrderModal: false
    }
  },
  methods: {
    handleLogin() {
      this.showLogin = !this.showLogin
    },
    handleOrderModal() {
      this.showOrderModal = !this.showOrderModal 
    }
  }
}
</script>

<template>
  <div>
    <NewHeader :showLogin="false" @openLogin="handleLogin" @openOrderModal="handleOrderModal" />
    <RouterView  @openLogin="handleLogin" @openOrderModal="handleOrderModal"/>
    <vue-final-modal v-model="showLogin" classes="modal-container" content-class="modal-content">
      <LoginComponent :showLogin="true" @hideLogin="handleLogin" />
    </vue-final-modal>
    
    <vue-final-modal
      v-model="showOrderModal"
      classes="modal-container"
      content-class="modal-content large"
    >
      <OrderModal :showOrderModal="true" @handleModal="handleOrderModal"/>
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
  border-radius: 8px;
  background: #fff;
}

:deep(.large){
  max-width: inherit;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
