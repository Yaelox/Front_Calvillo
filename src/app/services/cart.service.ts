import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  get totalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  addToCart(product: CartItem) {
    const items = this.cartItems;
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.cantidad += product.cantidad;
    } else {
      items.push(product);
    }

    this.cartItemsSubject.next([...items]);
  }

  removeFromCart(productId: number) {
    const items = this.cartItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next(items);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }
}
