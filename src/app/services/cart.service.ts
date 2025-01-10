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

  private items: CartItem[] = [];

  get totalPrice(): number {
    return this.items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  addToCart(item: CartItem) {
    const existingItem = this.items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.cantidad += item.cantidad;
    } else {
      this.items.push(item);
    }
    this.cartItemsSubject.next(this.items);
  }

  removeFromCart(itemId: number) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.cartItemsSubject.next(this.items);
  }

  clearCart() {
    this.items = [];
    this.cartItemsSubject.next(this.items);
  }
}
