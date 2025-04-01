import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RepartidorService, Venta } from 'src/app/services/repartidor.service';
import { UserService, User } from 'src/app/services/user.service';
import { ProductService, Producto } from 'src/app/services/product.service';

@Component({
  selector: 'app-check-venta-repartidores',
  templateUrl: './check-venta-repartidores.page.html',
  styleUrls: ['./check-venta-repartidores.page.scss'],
  imports:[CommonModule, IonicModule, FormsModule],
  standalone:true
})
export class CheckVentaRepartidoresPage implements OnInit {
  repartidores: any[] = [];
  productos: Producto[] = [];
  ventas: Venta[] = []; // Este array debe contener objetos de tipo 'Venta'
  repartidorSeleccionado: number | null = null;
  loading: boolean = false;
  ventaDetalles: { [key: number]: boolean } = {};
  isModalOpen: boolean = false;
  ventaSeleccionada: Venta | null = null;
  totalVentas: number = 0; // Para almacenar el total de ventas del repartidor seleccionado

  constructor(
    private repartidorService: RepartidorService,
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.obtenerRepartidores();
    this.obtenerProductos();
  }

  // Obtiene la lista de repartidores
  obtenerRepartidores() {
    this.loading = true;
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.repartidores = data.filter((user: User) => user.tipo_usuario === 'repartidor');
        this.loading = false;
      },
      error => {
        alert('Hubo un error al obtener los repartidores.');
        this.loading = false;
      }
    );
  }

  // Fetch the products
  obtenerProductos() {
    this.productService.getProducts().subscribe(
      (data: Producto[]) => {
        this.productos = data;  // Store the products in the array
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  // Obtiene las ventas por repartidor seleccionado
  obtenerVentasPorRepartidor(idRepartidor: number) {
    this.loading = true;
    this.totalVentas = 0; // Reset totalVentas each time a new repartidor is selected

    this.repartidorService.obtenerVentasPorRepartidor(idRepartidor).subscribe(
      (data: Venta[]) => {
        this.ventas = data;

        // Mapear los detalles de las ventas para agregar el nombre del producto
        this.ventas.forEach(venta => {
          venta.detalles.forEach(detalle => {
            const producto = this.productos.find(p => p.id_producto === detalle.producto_id);
            if (producto) {
              detalle.nombre_producto = producto.nombre; // Agregar el nombre del producto al detalle
            }
          });

          // Sumar el total de ventas
          this.totalVentas += venta.total;
        });

        this.loading = false; // Apaga el estado de carga
      },
      (error) => {
        console.error('Error al obtener las ventas:', error); // Loguea el error en la consola
        this.loading = false; // Apaga el estado de carga
        alert('Hubo un problema al cargar las ventas. Intenta de nuevo más tarde.'); // Muestra un mensaje de error al usuario
      }
    );
  }

  // Maneja la selección de un repartidor
  seleccionarRepartidor(idRepartidor: number) {
    this.repartidorSeleccionado = idRepartidor;
    this.obtenerVentasPorRepartidor(idRepartidor); // Llama al servicio para obtener ventas del repartidor
  }

  // Abre el modal con los detalles de la venta
  openVentaDetalles(venta: Venta) {
    this.ventaSeleccionada = venta; // Guarda la venta seleccionada
    this.isModalOpen = true; // Abre el modal
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen = false; // Cierra el modal
    this.ventaSeleccionada = null; // Limpia la venta seleccionada
  }

  // Alterna la visibilidad de los detalles de una venta
  toggleDetallesVenta(id_venta: number) {
    this.ventaDetalles[id_venta] = !this.ventaDetalles[id_venta];
  }
}
