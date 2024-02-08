<template>
  <div class="wrapper">
    <aside class="aside-container">
      <div v-for="(brand, index) in brands" v-bind:key="index" class="item-container">
        <div
          class="item"
          @click="brand.categories.length >= 1 ? showCategorie(index) : filterByBrand(brand.name)"
        >
          {{ brand.name }}
        </div>
        <div v-if="brand.categories.length >= 1 && brand.show_categories" class="subitem-container">
          <div
            v-for="(categorie, i) in brand.categories"
            v-bind:key="i"
            class="subitem"
            @click="
              categorie.subcategories?.length >= 1
                ? showSubCategories(index, i)
                : filterByCategorie(brand, categorie)
            "
          >
            {{ categorie.name }}
          </div>
        </div>
      </div>
    </aside>

    <main class="main-container">
      <input
        @input="filterBySearch(search)"
        class="search"
        type="text"
        v-model="search"
        placeholder="Ingrese su búsqueda
"
      />
      <div class="products-container">
        <ProductComponent
          v-for="(item, index) in paginatedProducts"
          v-bind:key="index"
          :name="item.ART_DESCR"
          :price="item.ART_PREVT"
        />
      </div>
      <pagination
        :options="{ template: MyPagination }"
        v-model="page"
        :records="filteredProducts.length"
        :per-page="itemsPerPage"
        @paginate="setPage"
      />
      <div v-if="showLoginModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showLoginModal = false">&times;</span>
          <Login :showLogin="true" />
        </div>
      </div>
    </main>
  </div>
</template>
<!-- <button @click="startGoogleDriveLogin">
      Iniciar sesión con Google Drive
    </button> -->

<script setup>
import Login from '@/components/Login.vue'
import ProductComponent from '@/components/ProductComponent.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useFirestore } from 'vuefire'
import { collection, getDocs } from 'firebase/firestore'
import Pagination from 'v-pagination-3'
import axios from 'axios'
import MyPagination from '@/components/MyPagination.vue'

const db = useFirestore()
const users = ref([])

// LOGIN
const showLoginModal = ref(false)

const handleShowLoginUpdate = (value) => {
  console.log('Valor recibido desde NewHeader:', value) // Agregar esta línea para imprimir el valor recibido
  showLoginModal.value = value
}

onMounted(() => {
  const eventHandler = (value) => {
    handleShowLoginUpdate(value)
  }
  window.addEventListener('update:show-login', eventHandler)
  onUnmounted(() => {
    window.removeEventListener('update:show-login', eventHandler)
  })
})

let productsList = ref([])
let filteredProducts = ref([])
let products = ref([])

// Pagination:
let paginatedProducts = ref([])
let page = ref(1)
let itemsPerPage = 12
const sheetsApi = 'https://sheets.googleapis.com'
const spreadsheetId = import.meta.env.VITE_SPREADSHEET_ID
const apiKey = import.meta.env.VITE_API_KEY

onMounted(async () => {
  // GOOGLE SHEETS:
  let sheetData = await axios({
    method: 'get',
    url: `${sheetsApi}/v4/spreadsheets/${spreadsheetId}`,
    params: {
      key: apiKey
    }
  })
  let endRange = sheetData.data.sheets[0].properties.gridProperties.rowCount
  let range = `A1:C${Number(endRange) - 3}`
  let sheetValues = await axios({
    method: 'get',
    url: `${sheetsApi}/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    params: {
      key: apiKey
    }
  })
  let keys = []
  sheetValues.data.values.forEach((row, i) => {
    let obj = {}
    row.forEach((cell, index) => {
      if (i === 0) keys.push(cell)
      if (index === 0) obj[keys[0]] = cell
      if (index === 1) obj[keys[1]] = cell
      if (index === 2) obj[keys[2]] = cell
      if (index === 3) obj[keys[3]] = cell
    })
    productsList.value.push(obj)
  })
  productsList.value = productsList.value.sort((a, b) => {
    if (a.ART_DESCR > b.ART_DESCR) {
      return 1
    }
    if (a.ART_DESCR < b.ART_DESCR) {
      return -1
    }
    return 0
  })

  products.value = JSON.parse(JSON.stringify(productsList.value))
  filteredProducts.value = JSON.parse(JSON.stringify(products.value))
  setPage(1)

  // USERS
  let usersData = await getDocs(collection(db, 'usuarios'))
  usersData.forEach((user) => {
    console.log(user.data())
    users.value.push(user.data())
  })
})

// PAGINATION
function setPage(page) {
  console.log(page)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex =
    startIndex + itemsPerPage > filteredProducts.value.length
      ? filteredProducts.value.length
      : startIndex + itemsPerPage
  paginatedProducts.value = filteredProducts.value.slice(startIndex, endIndex)
}

const search = ref('')

let brands = ref([
  {
    name: 'Doble A',
    categories: [
      {
        name: 'Cintas',
        show_subcategories: false
      },
      {
        name: 'Discos',
        show_subcategories: false,
        subcategories: [{ name: 'Discos papel' }, { name: 'Discos de corte' }]
      }
    ],
    show_categories: false
  },
  {
    name: 'El galgo',
    categories: [
      { name: 'Lijas y telas', show_subcategories: false },
      { name: 'Pinceles y brochas', show_subcategories: false },
      { name: 'Rodillos y filtros', show_subcategories: false }
    ],
    show_categories: false
  },
  {
    name: 'Loctite',
    categories: [],
    show_categories: false
  },
  {
    name: 'Congo',
    categories: [{ name: 'Cola y cemento', show_subcategories: false }],
    show_categories: false
  }
])

function showCategorie(index) {
  brands.value.forEach((item, i) => {
    if (index === i) {
      item.show_categories = !item.show_categories
    } else {
      item.show_categories = false
    }
  })
}

function showSubCategories(index, i) {
  brands.value.forEach((brand, brandIndex) => {
    if (index === brandIndex) {
      brand.categories.forEach((categorie, categorieIndex) => {
        if (categorieIndex === i) {
          categorie.show_subcategories = !categorie.show_subcategories
        } else {
          categorie.show_subcategories = false
        }
      })
    }
  })
}

function filterByBrand(brand) {
  products.value = productsList.value.filter((i) => i.marca === brand)
  filteredProducts.value = productsList.value.filter((i) => i.marca === brand)
}

function filterByCategorie(brand, categorie) {
  products.value = productsList.value.filter((i) => {
    if (i.marca === brand.name && i.categoria === categorie.name) return i
  })
  filteredProducts.value = productsList.value.filter((i) => {
    if (i.marca === brand.name && i.categoria === categorie.name) return i
  })
}

function filterBySearch(value) {
  filteredProducts.value = products.value.filter((i) => {
    if (
      i.nombre?.toLowerCase().includes(value.toLowerCase()) ||
      i.marca?.toLowerCase().includes(value.toLowerCase()) ||
      i.descripcion?.toLowerCase().includes(value.toLowerCase()) ||
      i.categoria?.toLowerCase().includes(value.toLowerCase()) ||
      i.subcategoria?.toLowerCase().includes(value.toLowerCase())
    ) {
      return i
    }
  })
}

//   startGoogleDriveLogin() {
//     // URL de autorización de Google Drive
//     const authorizationEndpoint = "https://accounts.google.com/o/oauth2/auth";

//     // Parámetros de la solicitud de autorización

//     const clientId =
//       "1021058833600-vq6mp5dhvb6e5alkfldamgslrnc12a33.apps.googleusercontent.com";
//     const redirectUri = "http://localhost:8080"; // Reemplaza con tu URI de redirección
//     const scope = "https://www.googleapis.com/auth/drive"; // Alcance para acceder a Google Drive
//     const responseType = "code"; // Tipo de respuesta esperada

//     // Construir la URL de autorización
//     const authorizationUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

//     // Redirigir al usuario a la página de autorización de Google Drive
//     window.location.href = authorizationUrl;
//   },
//   async authenticateGoogleDrive() {
//     try {
//       const clientId =
//         "1021058833600-vq6mp5dhvb6e5alkfldamgslrnc12a33.apps.googleusercontent.com";
//       const apiKey = "AIzaSyB0qxJbZcpzSm7DjpN181iRQmthsIivkEQ";
//       const searchDoc =
//         "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
//       console.log("API KEY", apiKey, clientId, searchDoc);
//       // Configuración para obtener el token de acceso
//       const tokenEndpoint = "https://oauth2.googleapis.com/token";
//       const clientSecret = "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"; // Reemplaza con tu secreto de cliente
//       const redirectUri = "http://localhost:8080"; // Reemplaza con tu URI de redirección

//       // Obtén el código de autorización (manual o a través de algún flujo de autenticación)
//       const authorizationCode =
//         "4/0AfJohXl6IVYvpfwvBnS9SrU4YaJ2eokMSFsV5G6ALphr0pUFAgiQPSxq_2Id2vgkXJecZA";

//       // Intercambio del código de autorización por el token de acceso
//       const tokenResponse = await axios.post(tokenEndpoint, {
//         code: authorizationCode,
//         client_id: clientId,
//         client_secret: clientSecret,
//         redirect_uri: redirectUri,
//         grant_type: "authorization_code",
//       });

//       const accessToken = tokenResponse.data.access_token;

//       // Ahora puedes realizar solicitudes a la API de Google Drive utilizando el accessToken
//       const driveEndpoint = "https://www.googleapis.com/drive/v3/files";
//       const driveResponse = await axios.get(driveEndpoint, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       console.log("Respuesta de Google Drive API:", driveResponse.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   },
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  /* padding: 3em 0; */
}
.aside-container {
  min-height: 70vh;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 3vw;
  margin-top: 3em;
}

.item-container {
  padding: 0.5em 0;
  border-bottom: 1px solid #d6d6d6;
  width: 90%;
  text-align: start;
}
.item {
  color: #023e8a;
  font-size: 1.2em;
  font-weight: bold;
  cursor: default;
}
.item:hover,
.subitem:hover {
  /* color: #097fff; */
  color: #ff5a3d;
}

.subitem-container {
  padding: 0.5em 0 0.5em 1vw;
}
.subitem {
  padding: 0.2em 0;
  cursor: pointer;
}

.main-container {
  width: 75%;
  padding: 3em 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search {
  width: 80%;
  height: 1.5em;
  font-size: 16px;
  letter-spacing: 0;
  font-weight: 400;
  color: #454545;
  border: 1px solid #cbcbcb;
  padding: 25px 18px;
  box-shadow: var(--shadow-1);
}
.search:focus-visible {
  outline: none;
  border: 1px solid #454545;
}
.products-container {
  display: flex;
  flex-wrap: wrap;
  padding-top: 2em;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
