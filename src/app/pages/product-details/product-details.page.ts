import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  imports:[CommonModule,HeaderComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsPage implements OnInit {
  producto: any;
  quantity: number = 1;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController
  ) {}

  goBack() {
    this.navCtrl.back(); // Navegar a la página anterior
  }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('ID del producto:', productId);  // Verifica que el ID esté llegando correctamente
    
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.producto = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar el producto';
          console.error('Error al obtener el producto:', error);
          this.isLoading = false;
        },
      });
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  comprar() {
    console.log(
      `Producto comprado: ${this.producto.nombre}, Cantidad: ${this.quantity}`
    );
    // Aquí puedes agregar lógica adicional para la compra
  }
}