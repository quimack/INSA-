<template>
  <div v-if="showLogin" class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit">
      <label for="username">Nombre de Usuario:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" class="login-button">Iniciar Sesión</button>
    </form>

    <div class="login-links">
      <a href="#">¿Olvidaste tu contraseña?</a>
      <a href="#">¿No tienes una cuenta?</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showLogin: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      // Agregar lógica de autenticación o registro aquí
      console.log('Nombre de usuario:', this.username);
      console.log('Contraseña:', this.password);
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
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
  margin-bottom: 16px;
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
