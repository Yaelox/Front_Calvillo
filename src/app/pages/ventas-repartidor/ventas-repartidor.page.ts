import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductService, Producto } from 'src/app/services/product.service';
import { RepartidorService } from 'src/app/services/repartidor.service';
import { UserService } from 'src/app/services/user.service';
import { MetaDiaComponent } from 'src/app/components/metadia/metadia.component';
import { MetaService } from 'src/app/services/meta.service';
import { UbicacionesService } from 'src/app/services/ubicacion.service';

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
  productos: Producto[] = [];
  carrito: { producto: Producto; cantidad: number; total: number }[] = [];
  total: number = 0;
  selectedProducto: Producto | null = null;
  cantidadProducto: number = 1;
  propietarioNombre: string = '';
  foto_venta: string | null = null;
  ubicaciones: any[] = [];
  ubicacionSeleccionada: any = null;

  descripcionRechazo: string = ''; // Almacenará el motivo de rechazo seleccionado

  rechazoRojo: string = '';
  comentarioRojo: string = '';

  rechazoAmarillo: string = '';
  comentarioAmarillo: string = '';

  rechazoVerde: string = '';
  comentarioVerde: string = '';

  motivoSeleccionado: string = ''; // Cambiar de boolean a string

  constructor(
    private repartidorService: RepartidorService,
    private userService: UserService,
    private metaService: MetaService,
    private productService: ProductService,
    private router: Router,
    private modalcontroller: ModalController,
    private ubicacionService: UbicacionesService
  ) {}

  ngOnInit() {
    this.obtenerUsuario();
    this.obtenerProductos();
    this.getUbicaciones();
  }

  getUbicaciones() {
    this.ubicacionService.getUbicaciones().subscribe(
      (ubicaciones) => {
        this.ubicaciones = ubicaciones;
        console.log('Ubicaciones obtenidas:', this.ubicaciones);
      },
      (error) => {
        console.error('Error al obtener ubicaciones:', error);
      }
    );
  }

  eliminarFoto() {
    this.foto_venta = null; // Esto eliminará la foto seleccionada
  }

  seleccionarImagen() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.click();
    
    input.onchange = (event: Event) => {
      const archivo = (event.target as HTMLInputElement).files?.[0];
      if (archivo) {
        const lector = new FileReader();
        lector.onload = () => {
          this.foto_venta = lector.result as string;
          console.log('Imagen seleccionada:', this.foto_venta);
        };
        lector.readAsDataURL(archivo);
      }
    };
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

  async capturarFoto() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 640;
      canvas.height = 480;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL('image/png');
      this.foto_venta = base64Image;

      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error al acceder a la cámara', error);
    }
  }

  async mostrarMetaModal() {
    try {
      const metaData = await this.metaService.getMetaDelDia().toPromise();
  
      if (metaData && metaData.meta !== undefined && metaData.vendidos !== undefined && metaData.progreso !== undefined) {
        const modal = await this.modalcontroller.create({
          component: MetaDiaComponent,
          componentProps: {
            meta: metaData.meta,
            vendidos: metaData.vendidos,
            progreso: metaData.progreso
          }
        });
  
        await modal.present();
  
        const { role } = await modal.onDidDismiss();
        if (role !== 'cancel') {
          this.router.navigate(['/home']);
        }
      } else {
        console.error('Los datos de la meta no son válidos', metaData);
      }
    } catch (error) {
      console.error('Error al obtener los datos de la meta:', error);
      this.router.navigate(['/home']);
    }
  }
  registrarVenta() {
    // Validar si los campos esenciales están completos
    if (this.total <= 0 || this.carrito.length === 0 || !this.descripcionRechazo) {
      console.error('Faltan datos necesarios para registrar la venta');
      console.log('Total:', this.total);
      console.log('Carrito:', this.carrito);
      console.log('Descripción de rechazo:', this.descripcionRechazo);
      return;
    }
  
    // Verificar si se ha seleccionado una ubicación y si tiene el id
    if (!this.ubicacionSeleccionada || !this.ubicacionSeleccionada.id) {
      console.error('Debe seleccionar una ubicación válida para la venta');
      console.log('Ubicación seleccionada:', this.ubicacionSeleccionada);
      return;
    }
  
    // Crear el objeto de la venta
    const venta = {
      repartidor_id: this.usuario.id_usuario, // ID del repartidor
      total: this.total, // Total de la venta
      foto_venta: this.foto_venta, // Foto de la venta
      motivo: this.motivoSeleccionado, // Motivo de la venta
      id_ubicacion: this.ubicacionSeleccionada?.id, // ID de la ubicación seleccionada
      productos: this.carrito.map((item) => ({
        producto_id: item.producto.id_producto,
        cantidad: item.cantidad,
        precio: item.producto.precio,
        total: item.total
      }))
    };
  
    console.log('Objeto de la venta que se enviará:', venta);
  
    // Enviar la venta al servicio de repartidor
    this.repartidorService.registrarVenta(venta).subscribe(
      async (response) => {
        console.log('Venta registrada con éxito', response);
  
        // Limpiar todos los campos después de registrar la venta
        this.carrito = [];
        this.total = 0;
        this.selectedProducto = null;
        this.cantidadProducto = 1;
        this.foto_venta = null;
        this.rechazoRojo = '';
        this.rechazoAmarillo = '';
        this.rechazoVerde = '';
        this.comentarioRojo = '';
        this.comentarioAmarillo = '';
        this.comentarioVerde = '';
        this.descripcionRechazo = '';
        this.motivoSeleccionado = '';
  
        // Ahora solo mostramos la modal sin necesidad de pasarle props
        try {
          const modal = await this.modalcontroller.create({
            component: MetaDiaComponent, // Solo abrimos la modal
          });
  
          await modal.present();
  
          const { role } = await modal.onDidDismiss();
          if (role !== 'cancel') {
            this.router.navigate(['/home']);
          }
  
        } catch (error) {
          console.error('Error al mostrar la modal de meta:', error);
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Error al registrar la venta:', error);
        console.log('Error de respuesta:', error); // Log para ver el error de la respuesta
      }
    );
  }
  recargarPagina() {
    window.location.reload();
  }
  motivosRojo: string[] = [
    'No tiene espacio en el mostrador',
    'No se vende este tipo de dulce aquí',
    'No se vendió el producto aquí',
    'Aquí la gente compra de 1 peso',
    'Le parece caro el producto',
    'No vende dulces sueltos',
    'No vende dulces que se tiene que meter la mano',
    'No le interesa',
    'Va a traspasar la tienda',
    'Va a quitar la tienda',
    'Ya tienen proveedor',
    'Se los roba la gente',
    'Se tardaron en regresar',
    'Otra causa de rechazo.'
  ];

  motivosAmarillo: string[] = [
    'Ahorita no',
    'Para otra vuelta',
    'No está quien decide las compras',
    'Sí le interesa pero no tiene dinero',
    'Sí le interesa pero más adelante porque están bajas las ventas',
    'Sí le interesa porque va a abrir un espacio',
    'Acaba de surtir dulces',
    'Ahorita se vende poco por el calor',
    'Otra causa de rechazo momentáneo'
  ];

  motivosVerde: string[] = [
    'Mucho interés',
    'Interés',
    'Puedes dejarnos un comentario aquí...'
  ];

  onSeleccion(color: string) {
    console.log('Seleccionado color:', color);

    if (color === 'rojo') {
      this.rechazoAmarillo = '';
      this.rechazoVerde = '';
      this.comentarioAmarillo = '';
      this.comentarioVerde = '';
      this.descripcionRechazo = this.rechazoRojo;
    } else if (color === 'amarillo') {
      this.rechazoRojo = '';
      this.rechazoVerde = '';
      this.comentarioRojo = '';
      this.comentarioVerde = '';
      this.descripcionRechazo = this.rechazoAmarillo;
    } else if (color === 'verde') {
      this.rechazoRojo = '';
      this.rechazoAmarillo = '';
      this.comentarioRojo = '';
      this.comentarioAmarillo = '';
      this.descripcionRechazo = this.rechazoVerde;
    }

    console.log('Descripción de rechazo seleccionada:', this.descripcionRechazo);

    if (color === 'rojo') {
      this.motivoSeleccionado = 'Motivo_Rojo';
    } else if (color === 'amarillo') {
      this.motivoSeleccionado = 'Motivo_Naranja';
    } else if (color === 'verde') {
      this.motivoSeleccionado = 'Motivo_Verde';
    }
  }

  cancelarSeleccion() {
    console.log('Cancelando selección...');
    this.rechazoRojo = '';
    this.rechazoAmarillo = '';
    this.rechazoVerde = '';
    this.comentarioRojo = '';
    this.comentarioAmarillo = '';
    this.comentarioVerde = '';
    this.descripcionRechazo = '';
    this.motivoSeleccionado = '';
    console.log('Selección cancelada:', this.descripcionRechazo);
  }

  dismiss() {
    console.log('Cerrando modal...');
    this.modalcontroller.dismiss();
  }

  confirmarRechazo() {
    console.log('Confirmar rechazo con descripción:', this.descripcionRechazo);

    if (this.descripcionRechazo.trim() !== '') {
      this.modalcontroller.dismiss(this.descripcionRechazo); 
    } else {
      console.error('Debe seleccionar un motivo de rechazo');
    }
  }
}
