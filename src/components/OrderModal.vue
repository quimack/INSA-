<template>
  <div v-if="showOrderModal" class="modal">
    <div class="modal-content scroll-y">
      <h2>Resumen de la compra</h2>
      <div class="order-header">
        <div class="order-column"></div>
        <div class="order-column flex-2">Producto</div>
        <div class="order-column flex-half">Precio</div>
        <div class="order-column flex-half">Cantidad</div>
      </div>
      <div class="order-item" v-for="(product, index) in orderStore.products" v-bind:key="index">
        <div class="order-column">
          <img src="/img/no-img.png" alt="Categoría" class="category-icon" />
        </div>
        <div class="order-column flex-2">{{ product.name }}</div>
        <div class="order-column flex-half">$ {{ product.price }}</div>
        <div class="order-column flex-half">{{ product.quantity }}</div>
      </div>

      <div class="total">
        <strong>Total: $ {{ orderStore.totalPrice }}</strong>
      </div>
      <div class="confirm-container">
        <button class="confirm-button" @click="confirmOrder">
          <span v-if="!showSpinner">Confirmar Pedido</span>
          <VueSpinner v-if="showSpinner" size="30" color="#fff" />
        </button>
      </div>
    </div>
  </div>

  <vue-final-modal v-model="showModalInfo" classes="modal-container" content-class="modal-content">
    <h3 class="modal-title">{{ modalTitle }}</h3>
    <p>{{ modalContent }}</p>

    <div class="btn-actions-container">
      <button v-if="!sendedEmail" class="btn btn-modal" @click="showModalInfo = false">
        Volver
      </button>
      <button v-if="sendedEmail" class="btn btn-modal" @click="toHome()">Ir al inicio</button>
    </div>
  </vue-final-modal>
</template>

<script>
import { useOrderStore } from '@/stores/orderState'
import { VueSpinner } from 'vue3-spinners'
import emailjs from '@emailjs/browser'
import pdfmake from 'pdfmake'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  name: 'OrderModal',
  components: {
    VueSpinner
  },
  emits: ['handleModal'],
  props: {
    showOrderModal: {
      type: Boolean,
      required: true
    },
    orderItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      orderStore: useOrderStore(),
      showSpinner: false,
      showModalInfo: false,
      modalTitle: '',
      modalContent: '',
      sendedEmail: false
    }
  },
  methods: {
    formatDate(date, locale, options) {
      return new Intl.DateTimeFormat(locale, options).format(date)
    },
    formatProducts(products) {
      let formatedProducts = []
      products.forEach((product) => {
        let productProps = []
        Object.entries(product).forEach((k) => {
          if (k[0] === 'art_code') k[0] = 'ART_CODIG'
          if (k[0] === 'price') k[0] = 'PRECIO'
          if (k[0] === 'name') k[0] = 'ART_DESCR'
          if (k[0] === 'quantity') k[0] = 'CANTIDAD'

          let prop = ` ${k[0]}: ${k[1]}   `
          productProps.push(prop)
        })
        formatedProducts.push(`      • ${productProps}`)
      })
      return formatedProducts
    },
    async sendEmail(data) {
      this.showSpinner = true
      const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const template_id = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const public_key = import.meta.env.VITE_EMAILJS_USER_ID
      try {
        await emailjs.send(service_id, template_id, data, public_key)

        this.showSpinner = false
        this.sendedEmail = true
        this.modalTitle = 'El pedido ha sido enviado de manera exitosa!'
        this.orderStore.reset()
        this.showModalInfo = true
      } catch (error) {
        console.log({ error })
        this.showSpinner = false
        this.sendedEmail = false
        this.modalTitle = 'Error inesperado!'
        this.modalContent =
          'El pedido no ha podido enviarse debido a un error inesperado, por favor vuelva a intentarlo!'
        this.showModalInfo = true
        this.showModalInfo = true
      }
    },
    async confirmOrder() {
      this.showSpinner = true

      const user = JSON.parse(localStorage.getItem('userLogged'))
      if (user) this.orderStore.initOrder(user?.email)

      const formatedDate = this.formatDate(this.orderStore.$state.fecha, 'es', {
        dateStyle: 'long'
      })
      const formatedProducts = this.formatProducts(this.orderStore.$state.products)

      const pdf = await this.generatePdf(formatedDate, user)
      
      let template_params = {
        name: user.nombre,
        lastname: user.apellido,
        date: formatedDate,
        company: user.empresa,
        email: user.email,
        products: formatedProducts,
        total: this.orderStore.$state.totalPrice,
        content: pdf
      }

      this.sendEmail(template_params)
    },
    async generatePdf(formatedDate, user) {
      let tableRows = [['Cantidad', 'Descripción', 'Código', 'Precio']]
      this.orderStore.$state.products.forEach((p) => {
        let row = [p.quantity, p.name, p.art_code, p.price]
        tableRows.push(row)
      })
      const docDefinition = {
        pageMargins: [40, 60, 40, 60],
        header: {
          text: formatedDate,
          style: 'header'
        },
        content: [
          {
            text: `Pedido de ${user.nombre} ${user.apellido}`,
            style: 'body'
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 100, '*'],
              body: tableRows,
              style: 'table'
            }
          },
          {
            text: `Total: ${this.orderStore.$state.totalPrice}`,
            style: 'total'
          }
        ],
        footer: {
          text: 'INSA Distribuidora',
          style: 'footer'
        },
        styles: {
          header: {
            fontSize: 12,
            italics: true,
            alignment: 'right',
            margin: [20, 20]
          },
          body: {
            fontSize: 12,
            margin: [0, 20]
          },
          footer: {
            fontSize: 14,
            alignment: 'right',
            margin: [20, 0]
          },
          total: {
            fontSize: 12,
            alignment: 'right',
            bold: true,
            margin: [0, 20]
          }
        }
      }

      return new Promise((resolve, reject) => {
        pdfmake.createPdf(docDefinition).getBase64(async (data) => {
          try {
            resolve(data)
          } catch (error) {
            reject(error)
          }
        })
      })
    },
    toHome() {
      this.showModalInfo = false
      this.$emit('handleModal')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.modal-title {
  font-size: 1rem;
  font-weight: 700;
  color: #007bff;
  text-align: center;
  margin-bottom: 0.5em;
}
:deep(.modal-content) {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 1.5em 3em;
  min-width: 40vw !important;
  max-width: 400px;
  /* border: 1px solid #e2e8f0; */
  border-radius: 8px;
  background: #fff;
}
.btn-actions-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
}
.btn {
  position: relative;
  background: var(--orange-soda);
  color: var(--white);
  font-family: var(--ff-poppins);
  font-size: var(--fs-5);
  /* text-transform: var(--text-transform, capitalize); */
  border: 1px solid var(--orange-soda);
  padding: 10px 20px;
  z-index: 1;
  border-radius: 5px;
  margin: 0 1em;
}
.btn:hover {
  --orange-soda: hsl(7, 72%, 46%);
}
.btn-modal {
  margin: 0 1em;
}
.display-flex {
  display: flex;
}
.modal {
  width: 78vw;
  height: 94vh;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  min-width: 60rem !important;
  margin: 0 !important;
}

.modal-content.scroll-y {
  max-width: 1600px !important;
  overflow-y: auto;
  max-height: 100%;
}
.order-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-block: 20px;
  font-weight: bold;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.order-column {
  flex: 1;
  text-align: center;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.flex-2 {
  flex: 2;
}
.flex-half {
  flex: 0.5;
}
.order-column:first-child {
  flex: 1;
  text-align: center;
}

.category-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 0.4rem;
}

.remove-icon,
.add-icon {
  font-size: 24px;
  cursor: pointer;
  color: #888;
}

.remove-icon:hover,
.add-icon:hover {
  color: #f00;
}

.total {
  font-size: 18px;
  margin-top: 20px;
  text-align: right;
}

.confirm-container {
  display: flex;
  width: 100%;
  justify-content: center;
}
.confirm-button {
  width: 160px;
  background-color: var(--orange-soda);
  color: var(--white);
  font-size: 1rem;
  font-weight: var(--fw-700);
  padding: 10px 15px;
  text-align: center;
}

.confirm-button:hover {
  --orange-soda: hsl(7, 72%, 46%);
}
</style>
