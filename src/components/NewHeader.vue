<template>
  <header class="header" data-header>
    <div class="overlay" data-overlay></div>

    <div class="header-top">
      <div class="container-header">
        <ul class="header-top-list">
          <li>
            <a href="mailto:ferreteríainsaurralde@gmail.com" class="header-top-link">
              <ion-icon name="mail-outline"></ion-icon>

              <span>ferreteríainsaurralde@gmail.com</span>
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

          <button class="header-top-btn" @click="routeStore()">Ir a la tienda</button>
        </div>
      </div>
    </div>

    <div class="header-bottom">
      <div class="container-header">
        <div>
          <a href="#" class="logo">
            <img src="../assets/images/INSA.png" to="/" alt="Homeverse logo" />
          </a>
<!--           <RouterLink to="/" class="logo"><h1>INSA</h1></RouterLink>
          <div class="txt">Distribuidor</div> -->
        </div>
        <nav class="navbar" data-navbar>
          <div class="navbar-top">
            <RouterLink to="/" class="logo">INSA</RouterLink>

            <button class="nav-close-btn" data-nav-close-btn aria-label="Close Menu">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>

          <div class="navbar-bottom">
            <ul class="navbar-list">
              <li>
                <a href="#home" to="/" class="navbar-link" data-nav-link>INICIO</a>
              </li>

              <li>
                <a href="#about" class="navbar-link" @click="routeStore()" data-nav-link
                  >Tienda ON-LINE</a
                >
              </li>

              <li>
                <a href="#service" class="navbar-link" data-nav-link>Contacto</a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="header-bottom-actions">
          <button class="header-bottom-actions-btn" aria-label="Search">
            <ion-icon name="search-outline"></ion-icon>

            <span>Search</span>
          </button>

          <button class="header-bottom-actions-btn" aria-label="Profile">
            <ion-icon name="person-outline"></ion-icon>

            <span>Profile</span>
          </button>

          <button class="header-bottom-actions-btn" aria-label="Cart">
            <ion-icon name="cart-outline"></ion-icon>

            <span>Cart</span>
          </button>

          <button class="header-bottom-actions-btn" data-nav-open-btn aria-label="Open Menu">
            <ion-icon name="menu-outline"></ion-icon>

            <span>Menu</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'NewHeader',
  setup() {
    const navbar = ref(null)
    const overlay = ref(null)
    const navCloseBtn = ref(null)
    const navOpenBtn = ref(null)
    const navbarLinks = ref(null)
    const header = ref(null)
    const isNavbarActive = ref(false)
    const isOverlayActive = ref(false)

    const elemToggleFunc = (elem) => elem.classList.toggle('active')

    const handleNavClick = () => {
      isNavbarActive.value = !isNavbarActive.value
      isOverlayActive.value = !isOverlayActive.value
    }

    const handleScroll = () => {
      header.value.classList.toggle('active', window.scrollY >= 400)
    }

    const addClickListeners = (elements) => {
      elements.forEach((elem) => {
        elem.addEventListener('click', handleNavClick)
      })
    }

    onMounted(() => {
      navbar.value = document.querySelector('[data-navbar]')
      overlay.value = document.querySelector('[data-overlay]')
      navCloseBtn.value = document.querySelector('[data-nav-close-btn]')
      navOpenBtn.value = document.querySelector('[data-nav-open-btn]')
      navbarLinks.value = document.querySelectorAll('[data-nav-link]')
      header.value = document.querySelector('[data-header]')

      if (navbarLinks.value && navbarLinks.value.length) {
        addClickListeners(Array.from(navbarLinks.value))
      }

      window.addEventListener('scroll', handleScroll)
    })

    watch([isNavbarActive, isOverlayActive], () => {
      elemToggleFunc(navbar.value)
      elemToggleFunc(overlay.value)
    })

    return {
      // Expose necessary variables or functions to the template
    }
  },
  methods: {
    routeStore() {
      this.$router.push('/tienda')
    }
  }
}
</script>

<style scope>
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
  justify-content: center;
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
  position: fixed;
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
    padding-block: 5px;
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
}

@media (min-width: 1200px) {
  .container-header {
    max-width: 1200px;
  }
  .header-bottom {
    position: absolute;
    left: 0;

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
}
</style>
