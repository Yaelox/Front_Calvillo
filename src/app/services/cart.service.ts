import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { CartItem } from '../pages/carrito/carrito.page';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Usando un Subject para emitir cambios
  cartItems$ = this.cartItemsSubject.asObservable();
  private cart: CartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');

  constructor() {}

  // Obtener los items del carrito como un Observable
  getCartItems(): Observable<any[]> {
    return this.cartItems$;
  }

  addToCart(product: CartItem) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  
    // Actualizar el Subject y emitir los cambios
    this.cartItemsSubject.next(this.cart);
    
    // Actualizar el contador de productos en el carrito
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemsSubject.next(this.cart);  // Emitir los cambios del carrito
    
    console.log(this.cart); // Para depuración
  }

  getCart() {
    return this.cart;  // Retornar los productos en el carrito
  }


  // Obtener el contador de productos en el carrito como un Observable
  getCartCount() {
  const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
  return new BehaviorSubject<number>(totalItems).asObservable();
}
}
