<template>
  <div v-if="showLogin" class="login-container">
    <form
      v-if="!showRegister && !showForgotPassword"
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <label for="username">Nombre de Usuario:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" class="login-button">Iniciar Sesión</button>
    </form>

    <form v-if="showRegister" class="register-form" @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" required />
      </div>

      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" v-model="apellido" required />
      </div>

      <div class="form-group">
        <label for="empresa">Empresa:</label>
        <input type="text" id="empresa" v-model="empresa" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <button type="submit" class="register-button margin-bottom">Registrarse</button>
      <a href="#" class="text-decoration" v-if="showRegister" @click.prevent="showLoginForm"
        >Volver al inicio de sesión</a
      >
    </form>

    <div v-if="showForgotPassword" class="forgot-password-container">
      <h2>¿Olvidaste tu contraseña?</h2>
      <p>
        Por favor, ingresa tu dirección de correo electrónico asociada con tu cuenta y te enviaremos
        instrucciones para restablecer tu contraseña.
      </p>
      <form class="forgot-password-form" @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input class="width-100" type="email" id="email" v-model="email" required />
        </div>
        <button type="submit" class="reset-password-button">Restablecer contraseña</button>
      </form>
      <a href="#" class="text-decoration" v-if="showForgotPassword" @click.prevent="showLoginForm"
        >Volver al inicio de sesión</a
      >
    </div>

    <div class="login-links">
      <a
        href="#"
        v-if="!showForgotPassword && !showRegister"
        @click.prevent="showForgotPasswordForm"
        >¿Olvidaste tu contraseña?</a
      >
      <a href="#" v-if="!showForgotPassword && !showRegister" @click.prevent="showRegisterForm"
        >¿No tienes una cuenta?</a
      >
    </div>
  </div>
</template>

<script>
import { useFirestore } from 'vuefire'
import { collection, getDocs } from 'firebase/firestore'
import { ref } from 'vue'
// const db = useFirestore()
// const users = ref([])

export default {
  props: {
    showLogin: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      username: '',
      password: '',
      showRegister: false,
      showForgotPassword: false,
      nombre: '',
      apellido: '',
      empresa: '',
      email: ''
    }
  },
  methods: {
    // async getUsers() {
    //   let usersData = await getDocs(collection(db, 'usuarios'))
    //   usersData.forEach((user) => {
    //     console.log(user.data())
    //     users.value.push(user.data())
    //   })
    // },
    handleSubmit() {
      // Agregar lógica de autenticación o registro aquí
      console.log('Nombre de usuario:', this.username)
      console.log('Contraseña:', this.password)
    },
    showRegisterForm() {
      this.showRegister = true
      this.$emit('hideLogin')
    },
    handleRegister() {
      // Agregar lógica de registro aquí
      console.log('Nombre:', this.nombre)
      console.log('Apellido:', this.apellido)
      console.log('Empresa:', this.empresa)
      console.log('Email:', this.email)
    },
    showLoginForm() {
      this.showRegister = false
      this.showForgotPassword = false
    },
    showForgotPasswordForm() {
      this.showForgotPassword = true
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
}

button {
  padding: 10px;
  background-color: var(--orange-soda);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: hsl(7, 72%, 46%);
}

.login-links {
  margin-top: 20px;
}

.login-links p {
  margin-bottom: 8px;
}

.login-links a {
  color: #007bff;
  text-decoration: none;
}

.login-links a:hover {
  text-decoration: underline;
}

.login-button {
  text-align: center;
  margin-top: 20px;
}

.login-form,
.login-form label,
.register-form label {
  margin-bottom: 8px;
}

.login-form input,
.register-form input {
  padding: 8px;
  width: 100%;
}

.login-button,
.register-button {
  padding: 10px;
  background-color: var(--orange-soda);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover,
.register-button:hover {
  background-color: hsl(7, 72%, 46%);
}
.login-links {
  margin-top: 20px;
}

.login-links p {
  margin-bottom: 8px;
}

.login-links a {
  color: #007bff;
  text-decoration: none;
}

.login-links a:hover {
  text-decoration: underline;
}

.login-button,
.register-button {
  text-align: center;
}
.form-group {
  margin-bottom: 16px;
}
.login-form,
.register-form {
  display: flex;
  flex-direction: column;
}
.margin-bottom {
  margin-bottom: 20px;
}
.text-decoration {
  color: #007bff;
}
.text-decoration:hover {
  text-decoration: underline;
}

.forgot-password-container h2 {
  margin-bottom: 10px;
}

.forgot-password-container p {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.reset-password-button {
  width: 100%;
  text-align: center;
  margin-block: 20px;
}
.width-100 {
  width: 100%;
}
@media screen and (max-width: 600px) {
  .login-container {
    width: 100%;
    box-sizing: border-box;
  }

  .login-form {
    width: 100%;
  }
}
</style>
