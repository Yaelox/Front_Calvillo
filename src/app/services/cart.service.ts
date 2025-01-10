import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Usando un Subject para emitir cambios
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Obtener los items del carrito como un Observable
  getCartItems(): Observable<any[]> {
    return this.cartItems$;
  }

  // Agregar un item al carrito
  addToCart(item: any) {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...currentItems, item]);
  }

  // Obtener el contador de productos en el carrito como un Observable
  getCartCount() {
    return new BehaviorSubject<number>(this.cartItemsSubject.value.length).asObservable();
  }
}
