<template>
  <div v-if="showLogin" class="login-container">
    <!-- LOGIN -->
    <form
      v-if="!showRegister && !showForgotPassword"
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <label for="email">Correo electrónico:</label>
      <input type="text" id="email" v-model="email" required />

      <label for="contrasenia">Contraseña:</label>
      <input type="password" id="contrasenia" v-model="contrasenia" required />
      <div v-if="wrongPassword" class="errorMsg">Contraseña incorrecta</div>

      <button type="submit" class="login-button">
        <span v-if="!showSpinner">Iniciar Sesión</span>
        <VueSpinner v-if="showSpinner" size="30" color="#fff" />
      </button>
    </form>

    <!-- REGISTRO -->
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

      <div class="form-group">
        <label for="contrasenia">Contraseña:</label>
        <input type="password" id="contrasenia" v-model="contrasenia" required />
      </div>

      <div class="form-group">
        <label for="repeatContrasenia">Repetir contraseña:</label>
        <input
          type="password"
          id="repeatContrasenia"
          v-model="repeatContrasenia"
          required
          @input="passwordValidator"
        />
        <div v-if="!passwordValidator" class="errorMsg">Las contraseñas deben coincidir</div>
      </div>

      <button
        type="submit"
        class="register-button margin-bottom"
        :disabled="
          !passwordValidator() ||
          this.nombre === '' ||
          this.apellido === '' ||
          this.email === '' ||
          this.empresa === '' ||
          this.contrasenia === '' ||
          this.repeatContrasenia === ''
        "
      >
        <span v-if="!showSpinner">Registrarse</span>
        <VueSpinner v-if="showSpinner" size="30" color="#fff" />
      </button>
      <a href="#" class="text-decoration" v-if="showRegister" @click.prevent="showLoginForm"
        >Volver al inicio de sesión</a
      >
    </form>

    <!-- RECUPERACION DE CONTRASEñA -->
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

  <vue-final-modal v-model="showInfoModal" classes="modal-container" content-class="modal-content">
    <h3 class="modal-title">{{ modalTitle }}</h3>
    <p>{{ modalInfo }}</p>

    <div v-if="showRegister && !registerSuccesful" class="btn-actions-container">
      <button class="btn btn-primary btn-modal" @click="toLoginModalAction()">
        Iniciar sesión
      </button>
      <button class="btn btn-primary btn-modal" @click="toRegisterModalAction()">
        Volver al registro
      </button>
    </div>

    <div v-if="showRegister && registerSuccesful" class="btn-actions-container">
      <button class="btn btn-primary btn-modal" @click="toStore()">Ir a la tienda</button>
    </div>
  </vue-final-modal>

  <vue-final-modal v-model="showErrorModal" classes="modal-container" content-class="modal-content">
    <h3 class="modal-title">{{ modalTitle }}</h3>
    <p>{{ modalInfo }}</p>
    <div class="btn-actions-container">
      <button class="btn btn-primary btn-modal" @click="toRegisterModalAction()">Volver</button>
    </div>
  </vue-final-modal>
</template>

<script>
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { VueSpinner } from 'vue3-spinners'
import { useUserStore } from '../states/userState'

export default {
  components: {
    VueSpinner
  },
  emits: ['hideLogin'],
  props: {
    showLogin: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      users: [],
      showSpinner: false,
      showInfoModal: false,
      showErrorModal: false,
      wrongPassword: false,
      modalInfo: '',
      modalTitle: '',
      showRegister: false,
      registerSuccesful: false,
      showForgotPassword: false,
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      contrasenia: '',
      repeatContrasenia: '',
      userStore: useUserStore()
    }
  },
  methods: {
    async getUsers() {
      try {
        let usersData = await getDocs(collection(db, 'usuarios'))
        usersData.forEach((user) => {
          this.users.push(user.data())
        })
        return this.users
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async handleSubmit() {
      try {
        this.showSpinner = true
        const users = await this.getUsers()
        const user = users.find((u) => u.email === this.email)
        this.showSpinner = false
        if (user) {
          if (user.contrasenia === this.contrasenia) {
            const data = {
              nombre: user.nombre,
              apellido: user.apellido,
              empresa: user.empresa,
              email: user.email
            }
            localStorage.setItem('userLogged', JSON.stringify(data))
            this.$emit('hideLogin')
          } else {
            this.wrongPassword = true;
          }
        } else {
          this.modalTitle = "Usuario no registrado"
          this.modalInfo = "El correo electrónico con el que intenta ingresar no se encuentra registrado. Por favor, regístrese primero."
          this.showErrorModal = true;
        }
      } catch (error) {
        console.log(error)
        this.showSpinner = false
        this.modalTitle = 'Hubo un error!'
        this.modalInfo = `Su usuario no pudo iniciar sesión debido a un error inesperado. Por favor vuelva a intentarlo!`
        this.showErrorModal = true
      }
    },
    showRegisterForm() {
      this.showRegister = true
    },
    async handleRegister() {
      this.showSpinner = true
      const users = await this.getUsers()

      if (users.some((u) => u.email === this.email)) {
        this.showSpinner = false
        this.modalTitle =
          'El correo electrónico ingresado ya está vinculado a un usuario registrado'
        this.modalInfo =
          'Por favor, inicie sesión con este correo electrónico o regístrese con uno diferente.'
        this.showInfoModal = true
      } else {
        try {
          const newUserRef = doc(collection(db, 'usuarios'))
          await setDoc(newUserRef, {
            nombre: this.nombre,
            apellido: this.apellido,
            empresa: this.empresa,
            email: this.email,
            contrasenia: this.contrasenia
          })
          this.showSpinner = false
          this.registerSuccesful = true
          this.modalTitle = 'Registro exitoso!'
          this.modalInfo = `Gracias por elegirnos ${this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1)}! Ya puede realizar su pedido.`
          this.showInfoModal = true
        } catch (error) {
          this.showSpinner = false
          console.log(error)
          this.modalTitle = 'Hubo un error!'
          this.modalInfo = `Su usuario no fue registrado debido a un error inesperado. Por favor vuelva a intentarlo!`
          this.showErrorModal = true
        }
      }
    },
    passwordValidator() {
      return this.contrasenia === this.repeatContrasenia
    },
    showLoginForm() {
      this.showRegister = false
      this.showForgotPassword = false
    },
    showForgotPasswordForm() {
      this.showForgotPassword = true
    },
    toLoginModalAction() {
      this.nombre = ''
      this.apellido = ''
      this.empresa = ''
      this.email = ''
      this.showInfoModal = false
      this.showLoginForm()
    },
    toRegisterModalAction() {
      this.showInfoModal = false
      this.showErrorModal = false;
      this.showRegister = true;
      this.email = ''
      this.contrasenia = '';
    },
    toStore() {
      this.showInfoModal = false
      this.$emit('hideLogin')
    }
  }
}
</script>

<style scoped>
.modal-title {
  font-size: 1rem;
  font-weight: 700;
  color: #007bff;
  text-align: center;
  margin-bottom: 0.5em;
}
:deep(.modal-content) {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 1.5em 3em;
  min-width: 40vw !important;
  max-width: 400px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
}
.login-container {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 100vh;
}

.btn-actions-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  /* width: 80%; */
}
.btn-modal {
  margin: 0 1em;
}
.login-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-block: 8px;
  padding-top: 8px;
}

input {
  padding: 8px;
}

.errorMsg {
  color: red;
  font-size: 0.8em;
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
button:hover:disabled {
  background-color: var(--orange-soda);
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
