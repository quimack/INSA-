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

    <div class="spinner-container" v-if="showSpinner">
      <VueSpinner size="100" color="#0b2c3c" />
    </div>

    <main class="main-container" v-if="!showSpinner">
      <input
        @input="setFilters()"
        class="search"
        type="text"
        v-model="filters.search"
        placeholder="Ingrese su búsqueda"
      />
      <div class="products-container">
        <ProductComponent
          v-for="(item, index) in paginatedProducts"
          @openLogin="openLogin"
          v-bind:key="index"
          :name="item.ART_DESCR"
          :price="item.ART_PREVT"
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
import ProductComponent from '@/components/ProductComponent.vue'
import Pagination from 'v-pagination-3'
import { onMounted, ref } from 'vue'
import MyPagination from '@/components/MyPagination.vue'
import axios from 'axios'
import { VueSpinner } from 'vue3-spinners'

const emit = defineEmits(['openLogin'])
function openLogin() {
  emit('openLogin')
}

let showSpinner = ref(true)
let productsList = ref([])
let filteredProducts = ref([])

let filters = ref({
  brand: null,
  categorie: null,
  search: ''
})

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
    productsList.value = formatData(productsList.value)
    productsList.value = productsList.value.filter((p) => {
      const value = Number(p.ART_PREVT)
      return !Number.isNaN(value)
    })

    productsList.value = orderList(productsList.value)

    filteredProducts.value = JSON.parse(JSON.stringify(productsList.value))
    setPage(1)

    showSpinner.value = false
  } catch (error) {
    console.log(error)
    showSpinner.value = false
  }
})

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
    if (i.ART_PREVT) {
      i.ART_PREVT = i.ART_PREVT.replace(/,/g, '')
    }
  })
  return data
}

// FILTER
function setFilters() {
  filteredProducts.value = productsList.value.filter((i) => {
    if (
      i.ART_DESCR?.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      (filters.value.brand && filters.value.brand.toLowerCase() === i.ART_BRAND?.toLowerCase()) ||
      (filters.value.categorie &&
        filters.value.categorie.toLowerCase() === i.ART_CATEG?.toLowerCase())
    ) {
      return i
    }
  })
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

let brands = ref([
  {
    name: 'Doble A',
    categories: [
      {
        name: 'Cintas y Discos',
        show_subcategories: false
      },
      {
        name: 'Velcro',
        show_subcategories: false,
        subcategories: [{ name: 'Discos papel' }, { name: 'Discos de corte' }]
      },
      {
        name: 'Lijas',
        show_subcategories: false
      },
      {
        name: 'Bandas',
        show_subcategories: false
      }
    ],
    show_categories: false
  },
  {
    name: 'El galgo',
    categories: [
      { name: 'Pinceles', show_subcategories: false },
      { name: 'Rodillos', show_subcategories: false },
      { name: 'Lijas', show_subcategories: false }
    ],
    show_categories: false
  },
  {
    name: 'Tyrolit',
    categories: [{ name: 'Discos y diamantados', show_subcategories: false }],
    show_categories: false
  },
  {
    name: 'Congo',
    categories: [
      { name: 'Cola', show_subcategories: false },
      { name: 'Cemento', show_subcategories: false }
    ],
    show_categories: false
  },
  {
    name: 'Aliafor',
    categories: [
      { name: 'Discos', show_subcategories: false },
      { name: 'Hile next', show_subcategories: false }
    ],
    show_categories: false
  },
  {
    name: 'Patrol',
    categories: [],
    show_categories: false
  },
  {
    name: 'Venturo',
    categories: [],
    show_categories: false
  },
  {
    name: 'Norton',
    categories: [],
    show_categories: false
  },
  {
    name: 'Ruhlmann',
    categories: [],
    show_categories: false
  },
  {
    name: 'Tek bond',
    categories: [],
    show_categories: false
  },
  {
    name: 'Electrodos',
    categories: [
      { name: 'Sideral', show_subcategories: false },
      { name: 'Conarco', show_subcategories: false }
    ],
    show_categories: false
  },
  {
    name: 'Buloneria',
    categories: [
      { name: 'Bulones', show_subcategories: false },
      { name: 'Tornillos', show_subcategories: false },
      { name: 'Arandelas', show_subcategories: false },
      { name: 'Tira fondos', show_subcategories: false },
      { name: 'Varios', show_subcategories: false }
    ],
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
