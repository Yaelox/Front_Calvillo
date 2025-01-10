import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = []; // Array para los productos del carrito
  private cartCountSubject = new BehaviorSubject<number>(0); // Observable para el contador

  constructor() {}

  // Agregar un producto al carrito
  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartCountSubject.next(this.cartItems.length); // Actualiza el contador
  }

  // Obtener el contador de productos en el carrito
  getCartCount() {
    return this.cartCountSubject.asObservable(); // Devuelve un observable
  }

  // Obtener los productos en el carrito
  getCartItems() {
    return this.cartItems;
  }
}
