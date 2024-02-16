<template>
  <section class="hero" id="home">
    <div class="container">
      <div class="hero-content">
        <p class="hero-subtitle">
          <ion-icon name="hammer-outline"></ion-icon>
          <span>Impulsando tu proyecto hacia el éxito</span>
        </p>
        <h2 class="h1 hero-title">Soluciones Completas en Ferretería</h2>
        <p class="hero-text">
          Desde hace más de 30 años. Tenemos una amplia trayectoria en el sector y una variada gama
          de productos. ¡Combinamos la calidad con los mejores precios! Somos
          <strong>representantes oficiales</strong> de grandes tales como:
          <span class="light-color"
            >Doble A, Tyrolit, Norton, El Galgo , Aliafor, Patroll, Venturo, Teckbond.</span
          >
          Brindamos soluciones a nuestros clientes más allá de la venta de productos.
        </p>
        <button class="btn" @click="routeStore()">Conoce Nuestra Tienda On-line</button>
      </div>

      <!-- Imagen del héroe -->
      <figure class="hero-banner">
        <img src="../assets/images/imagen1.jpg" alt="Modern house model" class="w-100" />
      </figure>
    </div>
  </section>
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

.w-100 {
  width: 100%;
}

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
