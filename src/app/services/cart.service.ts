import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private cart: any[] = [];  // Carrito almacenado solo en memoria

  constructor() {
    this.cartSubject.next(this.cart);
  }

  // Obtener el carrito actual (se suscribe a este Observable en los componentes)
  getCart() {
    return this.cartSubject.asObservable();
  }

  getCartItems() {
    return this.cart; // Retorna directamente el carrito actual
  }
  
  addToCart(product: any) {
    // Convertir el precio a número si es una cadena
    const precio = parseFloat(product.precio);
    
    // Verificar si 'id' y 'precio' están definidos y si 'precio' es un número válido
    if (!product.id_producto || isNaN(precio)) {
      console.error('Producto inválido', product);  // Imprime el producto en la consola para debug
      return;  // Evita agregar productos sin id o precio válido
    }
  
    // Generar un identificador único para el producto
    const uniqueId = `${product.id_producto.toString()}-${product.nombre}-${precio.toString()}`;
  
    // Verificar si el producto ya está en el carrito
    const existingItem = this.cart.find((item: any) => item.uniqueId === uniqueId);
  
    if (existingItem) {
      // Si el producto ya está, aumentamos la cantidad
      existingItem.cantidad += 1;
    } else {
      // Si el producto no está, lo agregamos al carrito con cantidad 1
      this.cart.push({ ...product, cantidad: 1, uniqueId, precio });
    }
    // Actualizamos el carrito
    this.updateCart();
  }
  
  // Eliminar un producto del carrito
removeFromCart(uniqueId: string) {
  // Filtrar el carrito para eliminar el producto con el uniqueId correspondiente
  this.cart = this.cart.filter(item => item.uniqueId !== uniqueId);
  this.updateCart();
}

updateQuantity(productId: number | string, cantidad: number) {
  const id = productId.toString(); // Convertimos a string si es necesario
  const item = this.cart.find(cartItem => cartItem.uniqueId === id); // Usamos uniqueId como string
  if (item && cantidad > 0) {
    item.cantidad = cantidad;
  } else if (item && cantidad === 0) {
    this.removeFromCart(id); // Eliminamos usando el uniqueId como string
  }
  this.updateCart();
}

  // Limpiar el carrito
  clearCart() {
    this.cart = [];
    this.updateCart();
  }

  // Actualizar el BehaviorSubject con el estado actual del carrito
  private updateCart() {
    this.cartSubject.next(this.cart);
  }

  // Obtener el total del carrito
  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }
}