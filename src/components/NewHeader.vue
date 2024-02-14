<template>
  <header class="header" data-header>
    <div class="overlay" data-overlay @click="closeCart"></div>

    <div class="header-top">
      <div class="container-header">
        <ul class="header-top-list">
          <li>
            <a href="mailto: ferreteroinsaurralde@gmail.com" class="header-top-link">
              <ion-icon name="mail-outline"></ion-icon>

              <span>ferreteroinsaurralde@gmail.com</span>
            </a>
          </li>
        </ul>

        <div class="wrapper">
          <span v-if="userName || user?.nombre"
            >Hola {{ userName ? userName : user?.nombre }}!</span
          >
          <ul class="header-top-social-list">
            <li>
              <a href="#" class="header-top-social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" class="header-top-social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="header-bottom">
      <div class="container-header">
        <div class="header-bottom-left" @click="routeHome">
          <a href="#" class="logo">
            <img src="../assets/images/insanuevo.png" to="/" alt="Homeverse logo" />
          </a>
        </div>
        <div v-if="!isStorePage" class="header-bottom-right">
          <button v-if="!isStorePage" class="header-top-btn" @click="routeStore">
            Ir a la tienda
          </button>
        </div>
        <nav class="navbar" data-navbar>
          <div class="navbar-top">
            <RouterLink to="/" class="logo">INSA</RouterLink>

            <button class="nav-close-btn" data-nav-close-btn aria-label="Close Menu">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>

          <div class="navbar-bottom"></div>
        </nav>

        <div class="header-bottom-actions">
          <button
            v-if="isStorePage"
            @click="routeHome"
            class="header-bottom-actions-btn"
            aria-label="Home"
            title="Ir al Inicio"
          >
            <ion-icon name="home-outline"></ion-icon>

            <span>Home</span>
          </button>

          <button
            v-if="isStorePage && !userStore.isUserLogged()"
            @click="$emit('openLogin')"
            class="header-bottom-actions-btn"
            aria-label="Profile"
            title="Iniciar Sesión"
          >
            <ion-icon name="person-outline"></ion-icon>

            <span>Perfil</span>
          </button>

          <button
            v-if="isStorePage && userStore.isUserLogged()"
            class="header-bottom-actions-btn"
            aria-label="Logout"
            @click="logOut"
            title="Cerrar Sesión"
          >
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Cerrar sesión</span>
          </button>

          <button
            v-if="isStorePage"
            class="header-bottom-actions-btn"
            aria-label="Cart"
            @click="toggleCart"
            title="Ver Mi Pedido"
          >
            <ion-icon name="cart-outline"></ion-icon>

            <span>Tienda</span>
          </button>

          <!-- Contenido del carrito -->
          <div v-if="isCartOpen" class="cart-content active" ref="cartContent">
<<<<<<< HEAD
            <h2 class="padding-title">Articulos Seleccionados</h2>
            <ul v-for="(product, index) in orderStore.products" v-bind:key="index">
              <li class="display-flex">
                <div class="price-display">
                  <span style="margin-right: 0.8em">{{ product.quantity }}</span>
                  <span class="span-width">{{ product.name }}</span>
                  <span class="price-width">$ {{ product.price }}</span>
                </div>
                <div class="burron-flex">
                  <button @click="addProduct(product)">
                    <!-- Botón para agregar producto -->
                    <ion-icon name="add-circle-outline"></ion-icon>
                  </button>
                  <button v-if="product.quantity > 1" @click="subtractProduct(product)">
                    <!-- Botón para restar producto -->
                    <ion-icon name="remove-circle-outline"></ion-icon>
                  </button>
                  <button @click="deleteProduct(product)">
                    <!-- Botón para eliminar producto -->
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </div>
              </li>
            </ul>

            <p class="padding">
              Total: <strong>$ {{ orderStore.totalPrice }}</strong>
            </p>
            <div class="order-width">
              <button class="header-top-btn make-payment" @click="$emit('openOrderModal')">
                Realizar Pedido
              </button>
=======
            <h2 v-if="orderStore.products.length > 1" class="padding-title">
              Artículos Seleccionados
            </h2>
            <h2 v-if="orderStore.products.length < 1" class="center padding-title">
              No ha agregado ningún producto
            </h2>
            <div class="scroll-y">
              <ul class="products-list">
                <li
                  class="display-flex"
                  v-for="(product, index) in orderStore.products"
                  v-bind:key="index"
                >
                  <div class="price-display">
                    <span style="margin-right: 0.8em">{{ product.quantity }}</span>
                    <span class="span-width">{{ product.name }}</span>
                    <span class="price-width">$ {{ product.price }}</span>
                  </div>
                  <div class="burron-flex">
                    <button @click="addProduct(product)">
                      <!-- Botón para agregar producto -->
                      <ion-icon name="add-circle-outline"></ion-icon>
                    </button>
                    <button v-if="product.quantity > 1" @click="subtractProduct(product)">
                      <!-- Botón para restar producto -->
                      <ion-icon name="remove-circle-outline"></ion-icon>
                    </button>
                    <button @click="deleteProduct(product)">
                      <!-- Botón para eliminar producto -->
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                  </div>
                </li>
              </ul>

              <p v-if="orderStore.products.length > 1" class="padding">
                Total: <strong>$ {{ orderStore.totalPrice }}</strong>
              </p>
              <div class="order-width">
                <button
                  class="header-top-btn make-payment"
                  :disabled="orderStore.products.length < 1"
                  @click="$emit('openOrderModal')"
                >
                  Ver Resumen
                </button>
              </div>
>>>>>>> 3d8dab75b4087aa7a97554878b00a90c97099594
            </div>
          </div>
          <div>
            <button class="header-bottom-actions-btn" data-nav-open-btn aria-label="Open Menu">
              <ion-icon name="menu-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userState'
import { useOrderStore } from '@/stores/orderState'
import { mapState } from 'pinia'


export default {
  name: 'NewHeader',
  components: [RouterLink],
  data() {
    return {
      isCartOpen: false,
      userStore: useUserStore(),
      orderStore: useOrderStore()
    }
  },
  computed: {
    isStorePage() {
      return this.$route.path === '/tienda'
    },
    user() {
      let user = null
      if (localStorage.getItem('userLogged')) {
        user = JSON.parse(localStorage.getItem('userLogged'))
      }
      return user
    },
    ...mapState(useUserStore, ['nombre']),
    userName() {
<<<<<<< HEAD
      console.log(this.nombre)
=======
>>>>>>> 3d8dab75b4087aa7a97554878b00a90c97099594
      return this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1)
    }
  },
  mounted() {
    // Agregar un manejador de eventos para cerrar el carrito cuando se hace clic fuera de él
    document.addEventListener('click', this.handleClickOutsideCart)
  },
  unmounted() {
    // Eliminar el manejador de eventos cuando el componente se destruye para evitar fugas de memoria
    document.removeEventListener('click', this.handleClickOutsideCart)
  },
  methods: {
    routeStore() {
      this.$router.push('/tienda')
    },
    routeHome() {
      this.$router.push('/')
    },
    toggleCart() {
      setTimeout(() => {
        this.isCartOpen = !this.isCartOpen
      })
    },
    closeCart() {
      if (this.isCartOpen) {
        this.isCartOpen = false
      }
    },
    handleClickOutsideCart(event) {
      // Verificar si el clic ocurrió fuera del carrito
      const cartElement = this.$refs.cartContent
      if (this.isCartOpen && cartElement && !cartElement.contains(event.target)) {
        this.isCartOpen = false
      }
    },
    subtractProduct(product) {
      this.orderStore.subtractProduct(product.art_code)
    },
    addProduct(product) {
      this.orderStore.addProduct({
        name: product.name,
        code: product.art_code,
        price: product.price
      })
    },
    deleteProduct(product) {
      this.orderStore.deleteProduct(product.art_code)
    },
    logOut() {
      localStorage.removeItem('userLogged')
      this.userStore.reset()
      this.orderStore.reset()
      this.isLoggedIn = false // Actualizar el estado de inicio de sesión al cerrar sesión
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>
.padding-title {
  padding-bottom: .5em;
  text-align: center;
}

.order-width {
  width: 100%;
  display: flex;
  justify-content: center;
}
.burron-flex {
  display: flex;
}
.price-display {
  display: flex;
  width: 100%;
}
.price-width {
  width: 20%;
}
.span-width {
  width: 100%;
}
.make-payment {
  width: 30%;
  text-align: center;
}
.padding {
  padding: .8em;
  text-align: right;
}
.display-flex {
  display: flex;
  justify-content: space-between;
  padding: 5px 0px 15px 0px;
}
.cart-content {
  border: 1px solid #d6d6d66e;
  border-radius: 12px;
  color: #000;
  position: absolute;
  top: 4em;
  width: 48vw;
  right: 0.6em;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10; /* Asegura que el contenido del carrito esté por encima de otros elementos */
  display: none; /* Oculta el contenido del carrito por defecto */
  max-height: 42vh;
  /* overflow-y: auto; */
}

.scroll-y {
  max-height: calc(42vh - (1.5em + 25px) - 1em);
  overflow-y: auto;
  padding-bottom: 1em;
}

.cart-content.active {
  display: block; /* Muestra el contenido del carrito cuando está activo */
}

.products-list{
  padding-right: .8em;
}
.header {
  position: relative;
  z-index: 2;
}

.header-top {
  background: var(--prussian-blue);

  padding-block: 15px;
}

.header-top .container-header,
.header-top-list {
  display: flex;

  flex-wrap: wrap;

  justify-content: space-between;

  align-items: center;
}

.header-top .container-header {
  gap: 8px 20px;
}

.container-header {
  padding-inline: 15px;
  color: #fff;
}

.header-top-list {
  gap: 15px;
}

.header-top-link {
  color: var(--white);
  font-size: var(--fs-6);
  font-weight: var(--fw-700);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.header-top-link:is(:hover, :focus) {
  color: var(--orange-soda);
}

button,
a {
  transition: var(--transition);
}

.header-top-link ion-icon {
  color: var(--orange-soda);
  font-size: 15px;
  --ionicon-stroke-width: 60px;
}

.header-top .wrapper,
.header-top-social-list {
  display: flex;
  align-items: center;
}

.header-top .wrapper {
  gap: 20px;
}

.header-top-social-list {
  gap: 8px;
}

.header-top-social-link {
  color: var(--white);
  font-size: 15px;
}

.header-top-btn {
  background: var(--orange-soda);
  color: var(--white);
  font-size: var(--fs-6);
  font-weight: var(--fw-700);
  padding: 4px 15px;
}

.header-top-btn:is(:hover, :focus) {
  --orange-soda: hsl(7, 72%, 46%);
}

.header-bottom {
  background: var(--white);
  padding-block: 25px;
}

.header-bottom .logo {
  margin-inline: auto;
}

.navbar {
  background: var(--white);
  position: fixed;
  top: 0;
  left: -310px;
  max-width: 300px;
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 10px hsla(0, 0%, 0%, 0.3);
  z-index: 5;
  padding: 60px 20px;
  visibility: hidden;
  transition: 0.15s ease-in;
}

.navbar.active {
  visibility: visible;
  transform: translateX(310px);
  transition: 0.25s ease-out;
}

.navbar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--cultured-1);
  margin-bottom: 25px;
}

.navbar-top .logo img {
  width: 200px;
}

.nav-close-btn ion-icon {
  font-size: 20px;
  --ionicon-stroke-width: 45px;
  padding: 5px;
}

.navbar-link {
  color: var(--cadet);
  font-size: var(--fs-5);
  font-weight: var(--fw-600);
  text-transform: uppercase;
  padding-block: 15px;
}

.navbar-link:is(:hover, :focus) {
  color: var(--orange-soda);
}

.overlay {
  position: fixed;
  inset: 0;
  background: hsla(0, 0%, 0%, 0.7);
  opacity: 0;
  pointer-events: none;
  transition: var(--transition);
  z-index: 4;
}

.overlay.active {
  opacity: 1;
  pointer-events: all;
}

.header-bottom-actions {
  background: var(--white);
  position: relative !important;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-block: 15px 10px;
  box-shadow: -2px 0 30px hsla(237, 71%, 52%, 0.2);
  z-index: 3;
}

.header-bottom-actions-btn ion-icon {
  color: hsl(0, 0%, 10%);
  font-size: 20px;
  margin-inline: auto;
  margin-bottom: 5px;
  --ionicon-stroke-width: 40px;
  transition: var(--transition);
}

.header-bottom-actions-btn:is(:hover, :focus) ion-icon {
  color: var(--orange-soda);
}

.header-bottom-actions-btn span {
  color: var(--cadet);
  font-family: var(--ff-poppins);
  font-size: var(--fs-7);
  font-weight: var(--fw-500);
}

.header-bottom-left {
  display: flex;
  align-items: center;
}

.header-bottom-right {
  display: flex;
  align-items: center;
}

@media (min-width: 600px) {
  .container-header {
    max-width: 550px;
    margin-inline: auto;
  }
}

@media (min-width: 768px) {
  .container-header {
    max-width: 720px;
  }

  .btn {
    --fs-5: 1rem;
    padding: 12px 28px;
  }
  .header-top {
    padding-block: 15px;
  }

  .header-top .wrapper {
    margin-left: auto;
  }

  .header-top-social-list {
    gap: 12px;
  }

  .header-top-social-link {
    font-size: 1rem;
  }

  .header-top-btn {
    padding: 10px 20px;
  }

  .header-bottom-actions {
    all: unset;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-bottom .container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-bottom-actions-btn ion-icon {
    margin-bottom: 0;
  }

  .header-bottom-actions-btn span {
    display: none;
  }

  .header-bottom-actions-btn {
    background: var(--white);
    width: 50px;
    height: 50px;
    box-shadow: var(--shadow-2);
  }
}

@media (min-width: 992px) {
  .container-header {
    max-width: 970px;
  }

  .btn {
    padding: 15px 40px;
  }
  .header-top-list,
  .header-top .wrapper {
    gap: 30px;
  }
  .header-bottom-right {
    margin-left: 42rem;
  }
}

@media (min-width: 1200px) {
  .container-header {
    max-width: 1200px;
  }
  .header-bottom {
    width: 100%;
  }
  .header-bottom {
    padding-block: 30px;
  }
  .navbar,
  .navbar.active {
    all: unset;
  }
  .navbar-list {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .header-bottom-actions-btn:last-child,
  .navbar-top,
  .overlay {
    display: none;
  }
  .header-bottom-right {
    margin-left: 42rem;
  }
}
</style>
