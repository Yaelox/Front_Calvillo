import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  imports:[HeaderComponent,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CarritoPage implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems); // Verifica qué contiene cartItems
      this.calculateTotal();
    });
  }

  calculateTotal() {
    if (this.cartItems.length > 0) {
      this.total = this.cartItems.reduce((acc, item) => {
        return acc + (parseFloat(item.precio) || 0); // Asegúrate de convertir precio a número
      }, 0);
    } else {
      this.total = 0; // Si no hay productos, el total es 0
    }
  }
  
  goToTienda() {
    this.router.navigate(['/tienda-online']);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
