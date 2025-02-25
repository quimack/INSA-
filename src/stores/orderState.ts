import { defineStore } from 'pinia'


export interface Product{
  name: string,
  art_code: string,
  quantity: number,
  price: number
}

export interface OrderState {
  fecha: Date | null,
  email: string,
  totalPrice: number,
  products: Product[]
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    fecha: null,
    email: '',
    totalPrice: 0,
    products: JSON.parse(localStorage.getItem('cart') || '[]')
  }),
  actions: {
    initOrder(email: string){
      this.fecha = new Date();
      this.email = email;
      this.saveCart();
    },
    reset(){
      this.fecha= null
      this.email= ''
      this.totalPrice= 0
      this.products= []
      localStorage.removeItem('cart');
    },
    addProduct(product: {name: string, price: number, code: string}) {
      if(this.products.some(p => p.art_code === product.code)){
        this.products.forEach( (p: Product) => {
          if(p.art_code === product.code){
             p.quantity++ 
          }
        })
      }else{
        const data: Product = {
          name: product.name,
          art_code: product.code,
          price: product.price,
          quantity: 1,
        }
        this.products.push(data);
      }
      this.getTotal()
      this.saveCart();
    },
    subtractProduct(code: string){
      if(this.products.some(p => p.art_code === code)){
        this.products.forEach( (p: Product) => {
          if(p.art_code === code){
            p.quantity-- 
          }
        })
      }
      this.getTotal()
      this.saveCart();
    },
    deleteProduct(code: string){
      this.products = this.products.filter(p => p.art_code !== code)
      this.getTotal()
      this.saveCart();
    },
    getTotal(){
      let counter = 0;
      this.products.forEach(p => {
        const totalProduct = p.price * p.quantity;
        counter += totalProduct;
      })
      this.totalPrice = Number(counter.toFixed(2));
      return this.totalPrice;
    },
    saveCart() {  // 🔹 Agregado aquí
      localStorage.setItem('cart', JSON.stringify(this.products));
    }
  }
})

