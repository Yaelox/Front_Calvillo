import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductService, Producto } from 'src/app/services/product.service';
import { RepartidorService } from 'src/app/services/repartidor.service';
import { TiendaService, Tienda } from 'src/app/services/tienda.service';
import { UserService } from 'src/app/services/user.service';

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
  productos: Producto[] = [];
  carrito: { producto: Producto; cantidad: number; total: number }[] = [];
  total: number = 0;
  selectedTienda: Tienda | null = null;
  selectedProducto: Producto | null = null;
  cantidadProducto: number = 1;
  propietarioNombre: string = '';
  foto_venta: string | null = null;

  constructor(
    private repartidorService: RepartidorService,
    private userService: UserService,
    private tiendaService: TiendaService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerUsuario();
    this.obtenerTienda();
    this.obtenerProductos();
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
    if (this.selectedProducto && this.cantidadProducto > 0) {
      const total = this.selectedProducto.precio * this.cantidadProducto;
      const productoExistente = this.carrito.find(
        (item) => item.producto.id_producto === this.selectedProducto!.id_producto
      );

      if (productoExistente) {
        productoExistente.cantidad += this.cantidadProducto;
        productoExistente.total = productoExistente.cantidad * productoExistente.producto.precio;
      } else {
        this.carrito.push({
          producto: this.selectedProducto,
          cantidad: this.cantidadProducto,
          total: total
        });
      }

      this.total = this.calcularTotal();
      this.selectedProducto = null;
      this.cantidadProducto = 1;
    }
  }

  eliminarProductoDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.total = this.calcularTotal();
  }

  calcularTotal(): number {
    return this.carrito.reduce((sum, item) => sum + item.total, 0);
  }

// Capturar foto con la cámara

async capturarFoto() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    // Esperar un segundo para cargar el video
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Capturar la foto de lo que está mostrando el video
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/png');
    this.foto_venta = base64Image; // Guarda la foto en base64

    // Detener el stream después de capturar la foto
    stream.getTracks().forEach(track => track.stop());
  } catch (error) {
    console.error('Error al acceder a la cámara', error);
  }
}


  registrarVenta() {
    if (this.total <= 0 || !this.selectedTienda || this.carrito.length === 0) {
      console.error('Faltan datos necesarios para registrar la venta');
      return;
    }

    const venta = {
      repartidor_id: this.usuario.id_usuario,
      tienda_id: this.selectedTienda?.id_tienda,
      total: this.total,
      foto_venta: this.foto_venta,
      productos: this.carrito.map((item) => ({
        producto_id: item.producto.id_producto,
        cantidad: item.cantidad,
        precio: item.producto.precio,
        total: item.total
      }))
    };

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
