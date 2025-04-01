import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  imports: [CommonModule, HeaderComponent, FooterComponent,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  standalone:true
})
export class ProductDetailsPage implements OnInit {
  producto: any;
  quantity: number = 1;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,

    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  goBack() {
    this.router.navigate(['/tienda-online'])// Navegar a la página anterior
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
    console.log('Cantidad incrementada:', this.quantity);
    setTimeout(() => {
      this.cdr.detectChanges(); // Forzar la actualización de la vista
    }, 0);
  }
  
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      console.log('Cantidad decrementada:', this.quantity);
      setTimeout(() => {
        this.cdr.detectChanges(); // Forzar la actualización de la vista
      }, 0);
    } else {
      console.log('La cantidad no puede ser menor a 1');
    }
  }
  
  
  
  // Comprar producto
  comprar() {
    if (!this.producto) {
      console.error('No se ha cargado el producto correctamente.');
      return;
    }
  
    const productoConCantidad = {
      ...this.producto,
      cantidad: this.quantity, // Usar la cantidad seleccionada
    };
  
    this.router.navigate(['/checkout'], {
      queryParams: {
        producto: JSON.stringify(productoConCantidad),
        fromCart: false,
      },
    });
  }
}
