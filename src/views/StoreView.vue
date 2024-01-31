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
          v-for="(item, index) in filteredProducts"
          v-bind:key="index"
          :img="item.img"
          :name="item.nombre"
          :description="item.descripcion"
          :price="item.precio"
          :categorie="item.categoria"
          :subcategorie="item.subcategoria"
          :uxpack="item.unidades_x_pack"
        />
      </div>
    </main>
  </div>
</template>
<!-- <button @click="startGoogleDriveLogin">
      Iniciar sesión con Google Drive
    </button> -->

<script setup>
import ProductComponent from '@/components/ProductComponent.vue'
import { ref } from 'vue'

const fileId = '11gGY9ArgQbWmoPX48QAn6x89NMDAa9HRTBvvFSzniuc'
const search = ref('')

let productsList = ref([
  {
    codigo: 109587457,
    marca: 'Doble A',
    categoria: 'Cintas',
    subcategoria: 'Cinta de enmascarar 903',
    nombre: 'Cinta de papel',
    descripcion: 'Cinta de pintor, para todo tipo de superficies',
    medidas: '12x40',
    precio: 3400,
    unidades_x_pack: 72,
    img: 'https://http2.mlstatic.com/D_NQ_NP_818816-MLA51985342337_102022-O.webp'
  },
  {
    codigo: 109583457,
    marca: 'Loctite',
    categoria: 'Cintas',
    subcategoria: 'Cinta de enmascarar 903',
    nombre: 'Cinta de papel',
    descripcion: 'Cinta de pintor, para todo tipo de superficies',
    medidas: '12x40',
    precio: 3400,
    unidades_x_pack: 72,
    img: 'https://http2.mlstatic.com/D_NQ_NP_818816-MLA51985342337_102022-O.webp'
  },
  {
    codigo: 109587456,
    marca: 'El galgo',
    categoria: 'Pinceles y brochas',
    subcategoria: 'Pincel MIX semiprof. V2',
    nombre: 'Mix semi profesional 10',
    precio: 1776.84,
    img: 'https://http2.mlstatic.com/D_NQ_NP_942839-MLU73836730676_012024-O.webp'
  },
  {
    codigo: 109587556,
    marca: 'El galgo',
    categoria: 'Pinceles y brochas',
    subcategoria: 'Brocha y resinero',
    nombre: 'Nro 20 resina',
    precio: 1301.16,
    img: 'https://http2.mlstatic.com/D_NQ_NP_615835-MLA53362335436_012023-O.webp'
  },
  {
    codigo: 109587458,
    marca: 'Doble A',
    categoria: 'Cintas',
    subcategoria: 'Cinta aisladora',
    nombre: 'Cinta negro',
    medidas: '18x10',
    precio: 698.72,
    unidades_x_pack: 10,
    img: 'https://http2.mlstatic.com/D_NQ_NP_632286-MLU72564533324_112023-O.webp'
  },
  {
    codigo: 109587457,
    marca: 'Doble A',
    categoria: 'Cintas',
    subcategoria: 'Cinta de enmascarar 903',
    nombre: 'Cinta de papel',
    medidas: '12x40',
    precio: 3400,
    unidades_x_pack: 72
  },
  {
    codigo: 109587456,
    marca: 'El galgo',
    categoria: 'Pinceles y brochas',
    subcategoria: 'Pincel MIX semiprof. V2',
    nombre: 'Mix semi profesional 10',
    precio: 1776.84
  },
  {
    codigo: 109587556,
    marca: 'El galgo',
    categoria: 'Pinceles y brochas',
    subcategoria: 'Brocha y resinero',
    nombre: 'Nro 20 resina',
    precio: 1301.16
  },
  {
    codigo: 109587458,
    marca: 'Doble A',
    categoria: 'Cintas',
    subcategoria: 'Cinta aisladora',
    nombre: 'Cinta negro',
    medidas: '18x10',
    precio: 698.72,
    unidades_x_pack: 10
  }
])

let products = ref(JSON.parse(JSON.stringify(productsList.value)))
let filteredProducts = ref(JSON.parse(JSON.stringify(products.value)))

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
  products.value = productsList.value.filter(
    (i) => {
      if(i.marca === brand.name && i.categoria === categorie.name) return i
    }
  )
  filteredProducts.value = productsList.value.filter(
    (i) => {
      if(i.marca === brand.name && i.categoria === categorie.name) return i
    }
  )
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
  /* background-color: #DCE8EF; */
  /* padding: 8em 1em 3em 1em; */
  /* font-family: var(--ff-poppins); */
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
</style>
