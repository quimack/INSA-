import { defineStore } from 'pinia'

export interface Product {
  name: string;
  art_code: string;
  quantity: number;
  price: number;
}

export interface OrderState {
  fecha: Date | null;
  email: string;
  totalPrice: number;
  products: Product[];
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    fecha: null,
    email: '',
    totalPrice: Number(localStorage.getItem('totalPrice')) || 0, // 🔹 Recupera el total del localStorage
    products: JSON.parse(localStorage.getItem('cart') || '[]'),
  }),
  actions: {
    initOrder(email: string) {
      this.fecha = new Date();
      this.email = email;
      this.saveCart();
    },
    reset() {
      this.fecha = null;
      this.email = '';
      this.totalPrice = 0;
      this.products = [];
      localStorage.removeItem('cart');
      localStorage.removeItem('totalPrice'); // 🔹 Borra el total guardado
    },
    addProduct(product: { name: string; price: number; code: string }) {
      const existingProduct = this.products.find((p) => p.art_code === product.code);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.products.push({
          name: product.name,
          art_code: product.code,
          price: product.price,
          quantity: 1,
        });
      }
      this.getTotal();
      this.saveCart();
    },
    subtractProduct(code: string) {
      this.products.forEach((p) => {
        if (p.art_code === code && p.quantity > 1) {
          p.quantity--;
        }
      });
      this.getTotal();
      this.saveCart();
    },
    deleteProduct(code: string) {
      this.products = this.products.filter((p) => p.art_code !== code);
      this.getTotal();
      this.saveCart();
    },
    getTotal() {
      this.totalPrice = this.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
      this.totalPrice = Number(this.totalPrice.toFixed(2));
      localStorage.setItem('totalPrice', this.totalPrice.toString()); // 🔹 Guarda el total en localStorage
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.products));
      localStorage.setItem('totalPrice', this.totalPrice.toString()); // 🔹 Guarda el total cada vez que se actualiza el carrito
    },
  },
});
