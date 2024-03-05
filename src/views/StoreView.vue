<template>
  <div class="wrapper">
    <aside class="aside-container">
      <div class="clear" @click="clearFilters()">Limpiar filtros</div>
      <div v-for="(brand, index) in brands" v-bind:key="index" class="item-container">
        <div
          class="item"
          :class="{ selected: filters.brand === brand.name }"
          @click="setBrand(brand.name, index)"
        >
          {{ brand.name }}
        </div>
        <div v-if="brand.categories.length >= 1 && brand.show_categories" class="subitem-container">
          <div
            v-for="(categorie, i) in brand.categories"
            v-bind:key="i"
            class="subitem"
            :class="{ selected: filters.categorie === categorie.name }"
            @click="setCategorie(categorie.name)"
          >
            {{ categorie.name }}
          </div>
        </div>
      </div>
    </aside>

    <div class="spinner-container" v-if="showSpinner">
      <VueSpinner size="100" color="#0b2c3c" />
    </div>

    <main class="main-container" v-if="!showSpinner">
      <div class="btn-container">
        <button v-if="orderStore.products.length >= 1" class="btn" @click="$emit('openOrderModal')">
          Ver Resumen
        </button>
      </div>
      <input
        @input="setFilters()"
        class="search"
        type="text"
        v-model="filters.search"
        placeholder="Ingrese su búsqueda"
      />

      <div v-if="paginatedProducts.length < 1" class="products-container" style="color: #ff5a3d">
        No hay productos que coincidan con la búsqueda.
      </div>

      <div class="products-container">
        <ProductComponent
          v-for="(item, index) in paginatedProducts"
          @openLogin="openLogin"
          v-bind:key="index"
          :img="item.img"
          :name="item.ART_DESCR"
          :price="item.PRECIO"
          :code="item.ART_CODIG"
        />
      </div>
    
      <pagination
        :options="{ template: MyPagination }"
        v-model="page"
        :records="filteredProducts.length"
        :per-page="itemsPerPage"
        @paginate="setPage"
      />
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { VueSpinner } from 'vue3-spinners'
import axios from 'axios'
import Pagination from 'v-pagination-3'
import ProductComponent from '@/components/ProductComponent.vue'
import MyPagination from '@/components/MyPagination.vue'
import { useOrderStore } from '@/stores/orderState'

const emit = defineEmits(['openLogin', 'openOrderModal'])
function openLogin() {
  emit('openLogin')
}
const orderStore = useOrderStore()

let showSpinner = ref(true)
let productsList = ref([])
let filteredProducts = ref([])

let filters = ref({
  brand: null,
  categorie: null,
  search: ''
})

let brands = ref()

// Pagination:
let paginatedProducts = ref([])
let page = ref(1)
let itemsPerPage = 12

const sheetsApi = 'https://sheets.googleapis.com'
const spreadsheetId = import.meta.env.VITE_SPREADSHEET_ID
const apiKey = import.meta.env.VITE_API_KEY

onMounted(async () => {
  // GET GOOGLE SHEETS DATA:
  try {
    let sheetData = await axios({
      method: 'get',
      url: `${sheetsApi}/v4/spreadsheets/${spreadsheetId}`,
      params: {
        key: apiKey
      }
    })
    let endRange = sheetData.data.sheets[0].properties.gridProperties.rowCount
    // let range = `A1:C${Number(endRange) - 3}`
    let range = `A1:E${endRange}`

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
        if (i === 0) {
          if (index === 2) {
            keys.push('PRECIO')
          } else {
            keys.push(cell)
          }
        }
        if (index === 0) obj[keys[0]] = cell
        if (index === 1) obj[keys[1]] = cell
        if (index === 2) {
          if (i === 0) {
            obj[keys[2]] = 'PRECIO'
          } else {
            obj[keys[2]] = cell
          }
        }
        if (index === 3) obj[keys[3]] = cell
        if (index === 4) obj[keys[4]] = cell
      })
      productsList.value.push(obj)
    })
    productsList.value = formatData(productsList.value)
    productsList.value = productsList.value.filter((p) => {
      const value = Number(p.PRECIO)
      return !Number.isNaN(value)
    })

    productsList.value = await addImages(productsList.value)
    productsList.value = orderList(productsList.value)
    brands.value = getBrands(productsList.value)
    brands.value = getCategories(productsList.value, brands.value)
    filteredProducts.value = JSON.parse(JSON.stringify(productsList.value))

    setPage(1)
    showSpinner.value = false
  } catch (error) {
    console.log(error)
    showSpinner.value = false
  }
})

const addImages = async (products) => {
  const context = await import.meta.glob('../../public/img/products/*.jpg');
  const imageNames = Object.keys(context).map(key => key.replace(/^..\/..\/public\/img\/products\/|\.jpg$/g, ''));

  console.log(imageNames)
  let newProducts = products.map((p) => {
    let img = imageNames.find((i) => i === p.ART_CODIG);
    if(img){
      return {...p, img: `/img/products/${img}.jpg`}
    }else{
      return {...p, img: null}
    }
  })
  return newProducts 
}

function orderList(data) {
  return data.sort((a, b) => {
    if (a.ART_DESCR > b.ART_DESCR) {
      return 1
    }
    if (a.ART_DESCR < b.ART_DESCR) {
      return -1
    }
    return 0
  })
}
function formatData(data) {
  data.forEach((i) => {
    if (i.PRECIO) {
      i.PRECIO = i.PRECIO.replace(/[$ ,]/g, '')
    }
  })
  return data
}

function getBrands(data) {
  let brands = []

  data.forEach((i) => {
    if (
      !brands.some(
        (b) =>
          b.name.charAt(0).toUpperCase() + b.name.slice(1) ===
          i.marca.charAt(0).toUpperCase() + i.marca.slice(1)
      )
    )
      brands.push({
        name: i.marca.charAt(0).toUpperCase() + i.marca.slice(1),
        categories: [],
        show_categories: false
      })
  })

  return brands
}

function getCategories(data, brands) {
  brands = brands.map((b) => {
    let categories = []
    data.forEach((i) => {
      if (
        i.marca.charAt(0).toUpperCase() + i.marca.slice(1) ===
        b.name.charAt(0).toUpperCase() + b.name.slice(1)
      ) {
        let isCategorie = categories.some(
          (c) =>
            c.name.charAt(0).toUpperCase() + c.name.slice(1) ===
            i.rubro.charAt(0).toUpperCase() + i.rubro.slice(1)
        )
        if (i.rubro && !isCategorie)
          categories.push({ name: i.rubro.charAt(0).toUpperCase() + i.rubro.slice(1) })
      }
    })
    return { ...b, categories: categories }
  })

  return brands
}

function setBrand(value, index) {
  filters.value.categorie = ''
  showCategorie(index)
  filters.value.brand = value
  setFilters()
}

function setCategorie(value) {
  filters.value.categorie = value
  setFilters()
}

// FILTER
function setFilters() {
  filteredProducts.value = productsList.value.filter((i) => {
    if (filters.value.brand && filters.value.categorie) {
      return (
        filters.value.brand.toLowerCase() === i.marca?.toLowerCase() &&
        filters.value.categorie.toLowerCase() === i.rubro?.toLowerCase()
      )
    }
    if (filters.value.brand && !filters.value.categorie) {
      return filters.value.brand.toLowerCase() === i.marca?.toLowerCase()
    }
    if (!filters.value.brand && filters.value.categorie) {
      return filters.value.categorie.toLowerCase() === i.rubro?.toLowerCase()
    }
  })

  if (filteredProducts.value.length > 0) {
    filteredProducts.value = filteredProducts.value.filter((i) => {
      return i.ART_DESCR?.toLowerCase().includes(filters.value.search.toLowerCase())
    })
  } else {
    filteredProducts.value = productsList.value.filter((i) =>
      i.ART_DESCR?.toLowerCase().includes(filters.value.search.toLowerCase())
    )
  }

  setPage(1)
  page.value = 1;
}

function clearFilters() {
  filters.value = {
    brand: null,
    categorie: null,
    search: ''
  }
  filteredProducts.value = productsList.value
  setPage(1)
}

// PAGINATION
function setPage(page) {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex =
    startIndex + itemsPerPage > filteredProducts.value.length
      ? filteredProducts.value.length
      : startIndex + itemsPerPage
  paginatedProducts.value = filteredProducts.value.slice(startIndex, endIndex)
}

function showCategorie(index) {
  brands.value.forEach((item, i) => {
    if (index === i) {
      item.show_categories = !item.show_categories
    } else {
      item.show_categories = false
    }
  })
}

// function showSubCategories(index, i) {
//   brands.value.forEach((brand, brandIndex) => {
//     if (index === brandIndex) {
//       brand.categories.forEach((categorie, categorieIndex) => {
//         if (categorieIndex === i) {
//           categorie.show_subcategories = !categorie.show_subcategories
//         } else {
//           categorie.show_subcategories = false
//         }
//       })
//     }
//   })
// }
</script>

<style scoped>
.spinner-container {
  width: 100%;
  margin-top: -150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  display: flex;
  width: 100%;
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

.clear {
  cursor: pointer;
  color: #023e8a;
  padding-bottom: 0.8em;
}

.item-container {
  padding: 0.5em 0;
  border-bottom: 1px solid #d6d6d6;
  width: 90%;
  text-align: start;
}

.btn-container {
  width: 80%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1em;
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
  border-radius: 5px;
}
.btn:hover {
  --orange-soda: hsl(7, 72%, 46%);
}
.item {
  color: #023e8a;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
}
.item:hover,
.item.selected,
.clear:hover,
.subitem:hover,
.subitem.selected {
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
  padding: 3em 4vw 6em 4vw;
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

@media (max-width: 600px) {
  .products-container {
    flex-direction: column;
  }
  .card {
    width: 55vw;
  }
  .aside-container {
    display: none;
  }
  .main-container {
    width: 100%;
  }
}
</style>
