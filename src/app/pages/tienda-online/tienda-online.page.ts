import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastController } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-tienda-online',
  templateUrl: './tienda-online.page.html',
  styleUrls: ['./tienda-online.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone:true,
  imports:[HeaderComponent, CommonModule,FooterComponent],
})
export class TiendaOnlinePage implements OnInit {
  productos: any[] = [];  // Array para almacenar los productos
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router, 
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  async presentToast(message: string) {
    console.log(`Toast: ${message}`);  // Depuración del mensaje del toast
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  goToDetails(productId: number): void {
    console.log('ID del producto en goToDetails:', productId);  // Depuración del ID recibido
    if (productId) {
      console.log('Redirigiendo a product-details con ID:', productId);
      this.router.navigate(['/product-details', productId]);
    } else {
      console.error('ID del producto no definido en goToDetails');
    }
  }

  recargarPagina() {
    window.location.reload();
  }
  
  addToCart(product: any) {
    console.log('Producto añadido al carrito:', product);  // Depuración del producto que se añade
    this.cartService.addToCart(product);  // Llamada al servicio para agregar el producto al carrito
    this.presentToast('Producto agregado al carrito');
  }

  ngOnInit() {
    console.log('Inicializando TiendaOnlinePage...');  // Depuración de la inicialización
    this.loadProductos();  // Cargar los productos al inicializar la página
  }

  loadProductos() {
    console.log('Cargando productos...');  // Depuración antes de cargar productos
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('Productos cargados:', data);  // Depuración de los productos cargados
        this.productos = data;
        this.isLoading = false;
  
        // Verificar que cada producto tenga un 'id'
        this.productos.forEach(producto => {
          console.log('Producto:', producto);  // Depuración de cada producto
          if (!producto.id_producto) {
            console.error('El producto no tiene un id:', producto);
          }
        });
      },
      (error) => {
        console.error('Error al obtener los productos:', error);  // Depuración del error al cargar productos
        this.errorMessage = 'Error al cargar los productos. Inténtalo más tarde.';
        this.isLoading = false;
      }
    );
  }
}
