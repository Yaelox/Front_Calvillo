import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductService, Producto } from 'src/app/services/product.service';
import { RepartidorService } from 'src/app/services/repartidor.service';
import { TiendaService, Tienda } from 'src/app/services/tienda.service';
import { UserService } from 'src/app/services/user.service'; // Servicio de productos

@Component({
  selector: 'app-ventas-repartidor',
  templateUrl: './ventas-repartidor.page.html',
  standalone: true,
  styleUrls: ['./ventas-repartidor.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VentasRepartidorPage implements OnInit {
  usuario: any;
  tiendas: Tienda[] = [];
  productos: Producto[] = []; // Lista de productos
  carrito: { producto: Producto; cantidad: number; total: number }[] = [];
  total: number = 0;
  selectedTienda: Tienda | null = null;
  selectedProducto: Producto | null = null;
  cantidadProducto: number = 1;
  propietarioNombre: string = '';

  constructor(
    private repartidorService: RepartidorService,
    private userService: UserService,
    private tiendaService: TiendaService,
    private productService: ProductService, // Servicio de productos
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerUsuario();
    this.obtenerTienda();
    this.obtenerProductos(); // Cargar productos al iniciar
  }

  obtenerUsuario() {
    const repartidorId = this.userService.getUserIdFromLocalStorage();
    if (repartidorId) {
      this.userService.getUserById(repartidorId).subscribe(
        (usuario) => {
          this.usuario = usuario;
          console.log('Usuario obtenido:', this.usuario);
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del repartidor en localStorage');
    }
  }

  obtenerTienda() {
    this.tiendaService.getTiendas().subscribe(
      (response: Tienda[]) => {
        if (response.length > 0) {
          this.tiendas = response;
          this.selectedTienda = this.tiendas[0];
          this.obtenerNombrePropietario(this.selectedTienda.id_usuario);
          console.log('Tiendas obtenidas:', this.tiendas);
        } else {
          console.error('No se encontraron tiendas');
          this.tiendas = [];
        }
      },
      (error) => {
        console.error('Error al obtener la información de la tienda:', error);
        this.tiendas = [];
      }
    );
  }

  obtenerProductos() {
    this.productService.getProducts().subscribe(
      (response: Producto[]) => {
        this.productos = response;
        console.log('Productos obtenidos:', this.productos);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  onTiendaChange(event: any) {
    this.selectedTienda = event.detail.value;
    if (this.selectedTienda?.id_usuario) {
      this.obtenerNombrePropietario(this.selectedTienda.id_usuario);
    }
  }

  obtenerNombrePropietario(idUsuario: number) {
    this.userService.getUserById(idUsuario).subscribe(
      (usuario) => {
        this.propietarioNombre = usuario?.nombre || 'Desconocido';
      },
      (error) => {
        console.error('Error al obtener el nombre del propietario:', error);
        this.propietarioNombre = 'Desconocido';
      }
    );
  }

 agregarProductoAlCarrito() {
  // Verificar si selectedProducto no es nulo y cantidadProducto es mayor a 0
  if (this.selectedProducto && this.cantidadProducto > 0) {
    const total = this.selectedProducto.precio * this.cantidadProducto;

    // Verificar si el producto ya está en el carrito
    const productoExistente = this.carrito.find(
      (item) => item.producto.id_producto === this.selectedProducto!.id_producto // Usamos '!' para asegurar que no es null
    );

    if (productoExistente) {
      // Si el producto ya está, sumar la cantidad
      productoExistente.cantidad += this.cantidadProducto;
      productoExistente.total = productoExistente.cantidad * productoExistente.producto.precio;
    } else {
      // Si el producto no está, agregarlo al carrito
      this.carrito.push({
        producto: this.selectedProducto, // No es necesario el operador !
        cantidad: this.cantidadProducto,
        total: total
      });
    }

    // Recalcular el monto total
    this.total = this.calcularTotal();

    // Resetear selección
    this.selectedProducto = null;
    this.cantidadProducto = 1;
  }
}

  eliminarProductoDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.total = this.calcularTotal(); // Recalcular total
  }

  calcularTotal(): number {
    return this.carrito.reduce((sum, item) => sum + item.total, 0);
  }

  registrarVenta() {
    console.log('Tienda seleccionada:', this.selectedTienda);
    console.log('Carrito:', this.carrito);

    // Verificación de los datos antes de registrar la venta
    if (this.total <= 0 || !this.selectedTienda || this.carrito.length === 0) {
        console.error('Faltan datos necesarios para registrar la venta');
        
        // Mostrar los datos faltantes en el log
        console.log('Total:', this.total);
        console.log('Tienda seleccionada:', this.selectedTienda);
        console.log('Carrito:', this.carrito);

        return;
    }

    const venta = {
      repartidor_id: this.usuario.id_usuario,
      tienda_id: this.selectedTienda?.id_tienda,
      total: this.total,
      productos: this.carrito.map((item) => ({
          producto_id: item.producto.id_producto, 
          cantidad: item.cantidad, 
          precio: item.producto.precio, 
          total: item.total 
      }))
  };
  

    // Log de los datos que se van a enviar
    console.log('Datos de la venta a registrar:', venta);

    this.repartidorService.registrarVenta(venta).subscribe(
        (response) => {
            console.log('Venta registrada con éxito', response);
            this.router.navigate(['/home']);
        },
        (error) => {
            console.error('Error al registrar venta:', error);
        }
    );
}
}