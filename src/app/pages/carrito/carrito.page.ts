import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CommonModule } from '@angular/common';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  quantity: number;
  imagen: string; // URL de la imagen
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  imports: [HeaderComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarritoPage implements OnInit {
  cartItems: CartItem[] = [];
  groupedItems: CartItem[] = [];  

  constructor(
    private router: Router, 
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]').map((item: any) => ({
      ...item,
      quantity: item.quantity || 1, // Asegura que cada producto tenga una cantidad inicial
    }));
    this.groupCartItems();
  }
  
  // Cargar los productos del carrito desde el servicio o localStorage
  loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.groupCartItems(); // Agrupar productos al cargar
  }

  // Agrupar los productos por ID y sumar cantidades
  groupCartItems() {
    const grouped = this.cartItems.reduce((acc: CartItem[], item: CartItem) => {
      const found = acc.find((i) => i.id === item.id);
      if (found) {
        found.quantity += item.quantity; // Incrementar la cantidad
      } else {
        acc.push({ ...item }); // Agregar nuevo producto
      }
      return acc;
    }, []);
    this.groupedItems = grouped;
    console.log('Productos agrupados:', this.groupedItems);
  }

  // Guardar los datos del carrito en localStorage
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Calcular el total
  get total() {
    return this.groupedItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  }

  // Aumentar la cantidad de un producto
  increaseQuantity(item: CartItem) {
    const found = this.cartItems.find((i) => i.id === item.id);
    if (found) {
      found.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.groupCartItems(); // Reagrupar y guardar
  }

  // Disminuir la cantidad de un producto (mínimo 1)
  decreaseQuantity(item: CartItem) {
    const found = this.cartItems.find((i) => i.id === item.id);
    if (found && found.quantity > 1) {
      found.quantity -= 1;
    } else {
      // Eliminar el producto si la cantidad llega a 0
      this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
    }
    this.groupCartItems(); // Reagrupar y guardar
  }

  // Volver a la tienda
  goToTienda() {
    this.router.navigate(['/tienda-online']);
  }

  // Ir al checkout
  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
