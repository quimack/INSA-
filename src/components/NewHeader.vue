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
          >
            <ion-icon name="home-outline"></ion-icon>

            <span>Home</span>
          </button>

          <button
            v-if="isStorePage"
            @click="$emit('openLogin')"
            class="header-bottom-actions-btn"
            aria-label="Profile"
          >
            <ion-icon name="person-outline"></ion-icon>

            <span>Perfil</span>
          </button>

          <button
            v-if="isStorePage"
            class="header-bottom-actions-btn"
            aria-label="Cart"
            @click="toggleCart"
          >
            <ion-icon name="cart-outline"></ion-icon>

            <span>Tienda</span>
          </button>
          <!-- Contenido del carrito -->
          <div  v-if="isCartOpen" class="cart-content active" ref="cartContent">
            <h2>Carrito de Compras</h2>
            <ul>
              <li class="display-flex">
                <span>ALIAFOR ADAP M14...</span>
                <button @click="agregarProducto">
                  <!-- Botón para agregar producto -->
                  <ion-icon name="add-circle-outline"></ion-icon>
                </button>
                <button @click="eliminarProducto">
                  <!-- Botón para eliminar producto -->
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </li>
              <li class="display-flex">
                <span>BALDE DE ALBAÑIL...</span>
                <button @click="agregarProducto">
                  <ion-icon name="add-circle-outline"></ion-icon>
                </button>
                <button @click="eliminarProducto">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </li>
              <li class="display-flex">
                <span>CARBORUNDUM RU...</span>
                <button @click="agregarProducto">
                  <ion-icon name="add-circle-outline"></ion-icon>
                </button>
                <button @click="eliminarProducto">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </li>
            </ul>
            <p class="padding">Total: <strong>$100.000</strong></p>
            <button class="header-top-btn make-payment" @click="$emit('openOrderModal')">Realizar Pedidos</button>
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

export default {
  name: 'NewHeader',
  components: [RouterLink],
  data() {
    return {
      isCartOpen: false // Agregar esta línea para definir la propiedad isCartOpen en los datos del componente
    }
  },
  computed: {
    isStorePage() {
      return this.$route.path === '/tienda'
    }
  },
  mounted() {
    // Agregar un manejador de eventos para cerrar el carrito cuando se hace clic fuera de él
    document.addEventListener('click', this.handleClickOutsideCart)
  },
  destroyed() {
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
      setTimeout(()=>{
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
    }
  }
}
</script>

<style scoped>
.make-payment {
  width: 100%;
  text-align: center;
}
.padding {
  padding: 5px;
}
.display-flex {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
.cart-content {
  position: absolute;
  top: 4em;
  width: 25vw;
  right: .6em;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10; /* Asegura que el contenido del carrito esté por encima de otros elementos */
  display: none; /* Oculta el contenido del carrito por defecto */
}

.cart-content.active {
  display: block; /* Muestra el contenido del carrito cuando está activo */
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
