import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule,HeaderComponent]
})
export class CheckoutPage implements OnInit {
  productos: any[] = []; // Lista de productos a comprar
  total: number = 0; // Total del pedido
  shippingInfo = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
  }; // Información de envío
  metodoPagoSeleccionado: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ngOnInit llamado');

    this.route.queryParams.subscribe((params) => {
      console.log('queryParams recibidos:', params);
      if (params['producto']) {
        const producto = JSON.parse(params['producto']);
        this.productos = [producto]; // Añade el producto al resumen
        this.calcularTotal();
      } else if (params['fromCart']) {
        // Lógica para cargar productos del carrito
        this.productos = this.cartService.getCartItems();
        console.log('Productos del carrito:', this.productos);
        this.calcularTotal();
      }
    });
  }
  
  calcularTotal() {
    console.log('Calculando total...');
    this.total = this.productos.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
    console.log('Total calculado:', this.total);
  }

  goToCart() {
    console.log('Navegando al carrito');
    this.router.navigate(['/carrito']);
  }

  goToProductDetails() {
    const productoId = this.productos.length === 1 ? this.productos[0].id_producto : null;
    console.log('ID del producto:', productoId);
    if (productoId) {
      this.router.navigate(['/product-details', productoId]);
    }
  }

  /**
   * Maneja el evento de finalizar la compra.
   */
  finalizarCompra() {
    if (!this.metodoPagoSeleccionado) {
      console.log('Por favor selecciona un método de pago.');
    } else {
      console.log('Método de pago seleccionado:', this.metodoPagoSeleccionado);
    }
  
    // Limpiar el carrito si la compra proviene del carrito
    const fromCart = this.route.snapshot.queryParamMap.get('fromCart') === 'true';
    console.log('Compra proveniente del carrito:', fromCart);
    if (fromCart) {
      this.cartService.clearCart();
    }

    // Redirigir a una página de éxito
    alert('¡Compra exitosa!');
  }

  /**
   * Valida que toda la información de envío esté completa.
   * @returns {boolean} true si toda la información está completa, false en caso contrario.
   */
  validateShippingInfo(): boolean {
    console.log('Validando información de envío:', this.shippingInfo);
    const { fullName, address, city, postalCode } = this.shippingInfo;
    return fullName && address && city && postalCode ? true : false;
  }
}
