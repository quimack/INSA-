import { defineStore } from 'pinia'
import { useOrderStore } from '@/stores/orderState'

export const useUserStore = defineStore('user', {
  state: () => ({
    nombre: '',
    apellido: '',
    empresa: '',
    email: ''
  }),
  actions: {
    setUser(user) {
      this.nombre = user.nombre
      this.apellido = user.apellido
      this.empresa = user.empresa
      this.email = user.email

      // Cargar el carrito después de iniciar sesión
      const orderStore = useOrderStore()
      orderStore.products = JSON.parse(localStorage.getItem('cart') || '[]')
      orderStore.getTotal()
    },
    reset() {
      this.nombre = ''
      this.apellido = ''
      this.empresa = ''
      this.email = ''
    },
    isUserLogged() {
      return !!JSON.parse(localStorage.getItem('userLogged'))
    }
  }
})
