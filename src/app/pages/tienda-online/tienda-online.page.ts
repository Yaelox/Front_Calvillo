import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-online',
  templateUrl: './tienda-online.page.html',
  styleUrls: ['./tienda-online.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[HeaderComponent,CommonModule],
})
export class TiendaOnlinePage implements OnInit {
  productos: any[] = []; // Array para almacenar los productos
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  goToDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }

  ngOnInit() {
    this.loadProductos(); // Cargar los productos al inicializar la página
  }

  // Método para obtener los productos desde el servicio
  loadProductos() {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('Productos obtenidos:', data);
        this.productos = data; // Asignar los productos obtenidos al array
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }
}
