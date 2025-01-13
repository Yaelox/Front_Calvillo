import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastController } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tienda-online',
  templateUrl: './tienda-online.page.html',
  styleUrls: ['./tienda-online.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[HeaderComponent, CommonModule, NgIf],
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
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);  // Llamada al servicio para agregar el producto al carrito
    this.presentToast('Producto agregado al carrito');
  }

  ngOnInit() {
    this.loadProductos();  // Cargar los productos al inicializar la página
  }

  loadProductos() {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (data) => {
        this.productos = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los productos. Inténtalo más tarde.';
        this.isLoading = false;
        console.error('Error al obtener los productos:', error);
      }
    );
  }
}