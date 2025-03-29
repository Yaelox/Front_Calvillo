import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { CrearProductoComponent } from 'src/app/components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from 'src/app/components/editar-producto/editar-producto.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { InventarioService } from 'src/app/services/inventario.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
  imports: [CommonModule, IonicModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone:true
})
export class InventarioPage implements OnInit {
  products: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private inventarioService: InventarioService,
    private productService: ProductService,
    private categoriaService: CategoriaService,
    private alertCtrl: AlertController 
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Abrir modal para agregar producto
  async openAddProductModal() {
    const modal = await this.modalCtrl.create({
      component: CrearProductoComponent
    });
    
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      this.loadProducts();
    }
  }

  // Abrir modal para editar producto
  async openEditProductModal(product: any) {
    const modal = await this.modalCtrl.create({
      component: EditarProductoComponent,
      componentProps: { product }
    });
    
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      this.loadProducts();
    }
  }
  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
  
      // Verificar el stock de cada producto
      this.products.forEach((product) => {
        if (product.categoria_id) {
          this.categoriaService.getCategoriaById(product.categoria_id).subscribe((category) => {
            product.categoryName = category.nombre;
          });
        } else {
          console.error(`El producto con ID ${product.id_producto} no tiene un id_categoria válido.`);
        }
  
        // Verificar si el stock es menor o igual a 10
        if (product.stock <= 10) {
          this.showStockAlert(product);  // Mostrar alerta si el stock es bajo
        }
      });
    });
  }

  async showStockAlert(producto: any) {
    setTimeout(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Alerta de Stock Bajo',
        message: `El producto "${producto.nombre}" tiene solo ${producto.stock} unidades en stock. ¡Asegúrate de reponerlo pronto!`,
        buttons: ['OK']
      });
      await alert.present();
    }, 0);  // Agregar un pequeño retraso
  }
  
  
  
  deleteProduct(id_producto: number) {
    if (!id_producto) {
      console.error('El ID del producto no está definido');
      return;
    }
  
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.inventarioService.deleteProduct(id_producto).subscribe(
        () => {
          console.log(`Producto con ID ${id_producto} eliminado.`);
          this.loadProducts();
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }
}
