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
  uniqueId: string;
}


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  imports: [HeaderComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarritoPage implements OnInit {
  cartItems: any[] = [];

  constructor(
    private router: Router, 
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Nos suscribimos al carrito para recibir actualizaciones
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
    });
  }
  
   // Obtener el total
   get total() {
    return this.cartService.getTotal();
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (item && item.uniqueId) {
      this.cartService.updateQuantity(item.uniqueId, quantity);
    } else {
      console.error('No se pudo actualizar cantidad. Producto inválido:', item);
    }
  }


 // Eliminar un producto del carrito
removeItem(product: CartItem) {
  if (product && product.uniqueId) {
    this.cartService.removeFromCart(product.uniqueId);  // Usamos uniqueId para eliminar el producto
  } else {
    console.error('Producto no válido para eliminar:', product);
  }
}


increaseQuantity(item: CartItem) {
  if (item && item.uniqueId) {
    this.cartService.updateQuantity(item.uniqueId, item.quantity + 1);
  } else {
    console.error('Producto no válido para incrementar cantidad:', item);
  }
}

decreaseQuantity(item: CartItem) {
  if (item && item.uniqueId) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.uniqueId, item.quantity - 1);
    } else {
      this.cartService.removeFromCart(item.uniqueId);
    }
  } else {
    console.error('Producto no válido para disminuir cantidad:', item);
  }


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