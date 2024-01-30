<template>
  <section class="hero" id="home">
    <div class="container">
      <div class="hero-content">
        <p class="hero-subtitle">
          <ion-icon name="hammer-outline"></ion-icon>

          <span>Somos una empresa dedicada a la distribución mayorista de</span>
        </p>

        <h2 class="h1 hero-title">Insumos De Ferretería</h2>

        <p class="hero-text">
          desde hace más de 30 años. Tenemos una amplia trayectoria en el sector y una variada gama
          de productos.¡Combinamos la calidad con los mejores precios!Somos
          <strong>representantes oficiales</strong> de grandes marcas tales como
          <span class="light-color"> Doble A, Tiroli, Norton, Teckbond y El Galgo </span>. Brindamos
          soluciones a nuestros clientes más allá de la venta de productos.
        </p>

        <button class="btn">Conoce Nuestra Tienda On-line</button>
      </div>

      <figure class="hero-banner">
        <img src="../assets/images/imagen1.jpg" alt="Modern house model" class="w-100" />
      </figure>
    </div>
  </section>

  <!--   <main id="us">
    <div class="container">
      <div class="p">
        Somos una empresa dedicada a la distribución mayorista de
        <strong>insumos de ferretería</strong> desde hace más de 30 años.
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
  </main> -->
</template>

<script>
export default {
  name: 'VueHowAreUs',
  methods: {
    routeStore() {
      this.$router.push('/tienda')
    }
  }
}
</script>

<style scoped>
.container {
  padding-inline: 15px;
}
.hero {
  background: var(--cultured-2);
  padding-block: var(--section-padding);
}

.hero-content {
  margin-bottom: 60px;
}

.hero-subtitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
}

.hero-subtitle ion-icon {
  color: var(--orange-soda);
}

.hero-subtitle span {
  color: var(--dark-jungle-green);
  font-size: var(--fs-5);
  font-weight: var(--fw-700);
}

.hero-title {
  margin-bottom: 20px;
}

.hero-text {
  color: var(--cadet);
  font-size: var(--fs-5);
  line-height: 1.8;
  padding-left: 15px;
  border-left: 1px solid;
  margin-bottom: 30px;
}

.h1,
.h2,
.h3 {
  color: var(--dark-jungle-green);
  font-family: var(--ff-poppins);
  line-height: 1.3;
}

.h1 {
  font-size: var(--fs-1);
  line-height: 1;
}

.h2 {
  font-size: var(--fs-2);
}

.h3 {
  font-size: var(--fs-4);
  font-weight: var(--font-weight, 700);
}

.h3 > a {
  color: inherit;
}

.btn {
  position: relative;
  background: var(--orange-soda);
  color: var(--white);
  font-family: var(--ff-poppins);
  font-size: var(--fs-5);
  text-transform: var(--text-transform, capitalize);
  border: 1px solid var(--orange-soda);
  padding: 10px 20px;
  z-index: 1;
}

.btn:is(:hover, :focus) {
  background: var(--black);
  color: var(--dark-jungle-green);
  border-color: var(--black);
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: var(--white);
  transition: var(--transition);
  z-index: -1;
}

.btn:is(:hover, :focus)::before {
  width: 100%;
}
.light-color {
  color: #097fff;
}
/* main {
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

.dark-color {
  color: #023e8a;
  font-size: 1.1em;
}
.router a {
  text-decoration: underline;
  cursor: pointer;
}

.router:hover {
  color: #097fff;
} */

@media (min-width: 600px) {
  .container {
    max-width: 550px;
    margin-inline: auto;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  .hero-content {
    max-width: 400px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 970px;
  }
  .hero-content {
    max-width: unset;
    margin-bottom: 0;
  }

  .hero .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
  }

  .hero-text {
    padding-left: 30px;
    max-width: 450px;
    margin-bottom: 40px;
  }
  .has-scrollbar > li {
    min-width: calc(33.33% - 16.66px);
  }
}
</style>
