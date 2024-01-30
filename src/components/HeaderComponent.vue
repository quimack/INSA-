<template>
  <nav class="navbar">
    <div class="logo-container">
      <RouterLink to="/" class="logo">INSA</RouterLink>
      <div class="txt">Distribuidor mayorista de insumos de ferretería</div>
    </div>
    <div class="nav">
      <a href="#us" class="navbar-item">INICIO</a>
      <RouterLink to="/tienda" class="navbar-item">TIENDA ON-LINE</RouterLink>
      <a href="#contact" class="navbar-item">CONTACTO</a>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>

<style scoped>
.navbar {
  padding: 1em 2.5em;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  color: #fff;
}
.logo-container {
  width: 55%;
}
.logo {
  font-size: 2.2em;
  font-weight: 900;
  text-decoration: none;
  color: #072440;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.txt {
  font-style: italic;
  color: #097fff;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 30%;
}

.navbar-item {
  text-decoration: none;
  background: transparent;
  border: none;
  font-size: 1.2em;
  font-family: "Outfit", sans-serif;
  cursor: pointer;
  color: #084690;

}
.navbar-item:hover {
    color: #097fff;
  }
</style>
