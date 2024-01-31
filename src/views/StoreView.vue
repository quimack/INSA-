<template>
  <div class="wrapper">
    <aside class="aside-container">
      <div
        v-for="(item, index) in categories"
        v-bind:key="index"
        class="item-container"
        @click="showSubcategorie(index)"
      >
        <div class="item">{{ item.name }}</div>
        <div
          v-if="item.subcategories.length >= 1 && item.show_subcategories"
          class="subitem-container"
        >
          <div v-for="(subitem, i) in item.subcategories" v-bind:key="i" class="subitem">
            {{ subitem.name }}
          </div>
        </div>
      </div>
    </aside>

    <main class="main-container">
      <input
        class="search"
        type="text"
        v-model="search"
        placeholder="Ingrese su búsqueda
"
      />
      <div class="products-container">
        <ProductComponent
          v-for="(item, index) in products"
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

let products = ref([
  {
    codigo: 109587457,
    marca: 'Doble A',
    categoria: 'Cintas',
    subcategoria: 'Cinta de enmascarar 903',
    nombre: 'Cinta de papel',
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

let categories = ref([
  {
    name: 'Doble A',
    subcategories: [{ name: 'Cintas' }, { name: 'Discos' }],
    show_subcategories: false
  },
  {
    name: 'El galgo',
    subcategories: [
      { name: 'Lijas y telas' },
      { name: 'Pinceles y brochas' },
      { name: 'Rodillos y filtros' }
    ],
    show_subcategories: false
  },
  {
    name: 'Loctite',
    subcategories: [],
    show_subcategories: false
  },
  {
    name: 'Congo',
    subcategories: [{ name: 'Cola y cemento' }],
    show_subcategories: false
  }
])

function showSubcategorie(index) {
  categories.value.forEach((item, i) => {
    if (index === i) {
      console.log('entra')
      item.show_subcategories = !item.show_subcategories
      console.log(item)
    } else {
      item.show_subcategories = false
    }
  })

  console.log('listo')
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
  font-size: 1.3em;
  font-weight: bold;
  cursor: default;
}
.item:hover {
  color: #097fff;
}

.subitem-container {
  padding: 0.5em 0 0.5em 1vw;
}
.subitem {
  padding: 0.2em 0;
  cursor: pointer;
}
.subitem:hover {
  color: #097fff;
}

.main-container {
  width: 75%;
  padding: 3em 4vw;
}

.search {
  width: 80%;
  height: 1.5em;
  font-size: 16px;
  letter-spacing: 0;
  font-weight: 400;
  /* border-radius: 8px; */
  color: #454545;
  border: 1px solid #cbcbcb;
  /* padding: .2em .4em; */
  padding: 25px 18px;
  font-family: 'Outfit', sans-serif;
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
