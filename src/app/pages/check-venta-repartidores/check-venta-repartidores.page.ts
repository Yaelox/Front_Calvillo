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
  administradores: any[] = [];  // Agregamos un array para los administradores
  productos: Producto[] = [];
  ventas: Venta[] = [];  // Este array debe contener objetos de tipo 'Venta'
  repartidorSeleccionado: number | null = null;
  administradorSeleccionado: number | null = null;  // Para seleccionar un administrador
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
    this.obtenerAdministradores();  // Llamada a la función para obtener administradores
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

  // Obtiene la lista de administradores
  obtenerAdministradores() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.administradores = data.filter((user: User) => user.tipo_usuario === 'administrador');
      },
      error => {
        console.error('Error al obtener los administradores:', error);
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
  obtenerVentasPorUsuario(idUsuario: number) {
    this.loading = true;
    this.totalVentas = 0;
  
    this.repartidorService.obtenerVentasPorRepartidor(idUsuario).subscribe( // puede renombrarse en tu servicio
      (data: Venta[]) => {
        this.ventas = data;
  
        this.ventas.forEach(venta => {
          venta.detalles.forEach(detalle => {
            const producto = this.productos.find(p => p.id_producto === detalle.producto_id);
            if (producto) {
              detalle.nombre_producto = producto.nombre;
            }
          });
          this.totalVentas += venta.total;
        });
  
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
        this.loading = false;
        alert('Hubo un problema al cargar las ventas.');
      }
    );
  }
  seleccionarRepartidor(id: number) {
    this.repartidorSeleccionado = id;
    this.administradorSeleccionado = null; // deseleccionar administrador
    this.obtenerVentasPorUsuario(id);
  }
  
  seleccionarAdministrador(id: number) {
    this.administradorSeleccionado = id;
    this.repartidorSeleccionado = null; // deseleccionar repartidor
    this.obtenerVentasPorUsuario(id);
  }

  recargarPagina() {
    window.location.reload();
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