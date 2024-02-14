import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
  }),
  actions: {
    setUser(user) {
      this.nombre = user.nombre
      this.apellido = user.apellido
      this.empresa = user.empresa
      this.email = user.email
    },
    reset() {
      this.nombre= ''
      this.apellido= ''
      this.empresa= ''
      this.email= ''
    },
  }
})
