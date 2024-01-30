<template>
  <main id="us">
    <div class="container">
      <div class="p">
        Somos una empresa dedicada a la distribución mayorista de
        <strong>insumos de ferretería </strong> desde hace más de 30 años.
        Tenemos una amplia trayectoria en el sector y una variada gama de
        productos.
        <div class="dark-color">
          ¡Combinamos la calidad con los mejores precios!
        </div>
      </div>
      <div class="p">
        Somos <strong>representantes oficiales</strong> de grandes marcas tales
        como
        <span class="light-color">
          Doble A, Tiroli, Norton, Teckbond y El Galgo </span
        >. Brindamos soluciones a nuestros clientes más allá de la venta de
        productos.
        <div class="dark-color">¡Conocé más en nuestra <span class="router" @click="routeStore()"> tienda on-line</span>!</div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "VueHowAreUs",
  methods: {
    routeStore(){
      this.$router.push("/tienda");
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.8em 16vw;
  font-size: 1.3em;

}
.container{
    background-color: #fff;
    border-radius: 16px;
    width: 65vw;
    padding: 2em;
}
.p {
  padding: 0.8em 0;
}
.light-color {
  color: #097fff;
}
.dark-color {
  color: #023e8a;
  font-size: 1.1em;
}
.router{
  cursor: pointer;
}
  .router:hover{
    color: #097fff;
  }
</style>
