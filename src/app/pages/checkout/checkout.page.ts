import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import * as L from 'leaflet'; // Importar Leaflet
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComprasService } from 'src/app/services/compras.service';
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de que AuthService esté importado
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, IonicModule]
})
export class CheckoutPage implements OnInit, AfterViewInit, OnDestroy {
  productos: any[] = [];
  total: number = 0;
  selectedLat: number | null = null;
  selectedLng: number | null = null;

  // Actualización de la información de envío
  nombre_completo: string = '';
  direccion: string = '';
  ciudad: string = '';
  codigo_postal: string = '';

  metodoPagoSeleccionado: string = '';
  userLat: number | null = null;
  userLng: number | null = null;
  map: any;
  marker: any;
  id_usuario: number | null = null;

  // Nueva propiedad para entrega inmediata
  entregaInmediata: boolean = false; // Variable para controlar si la entrega es inmediata
  costoExtraEntregaInmediata: number = 50; // Costo extra por la entrega inmediata

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private comprasService: ComprasService,
    private userService: UserService
  ) {}

  onPaymentMethodChange(event: any) {
    console.log('Método de pago actualizado:', event);
  }

  ngOnInit() {
    console.log('ngOnInit llamado');
    this.route.queryParams.subscribe((params) => {
      console.log('queryParams recibidos:', params);
      if (params['producto']) {
        const producto = JSON.parse(params['producto']);
        console.log('Producto desde queryParams:', producto);
        this.productos = [producto];
      } else if (params['fromCart']) {
        console.log('Productos desde carrito:', this.cartService.getCartItems());
        this.productos = this.cartService.getCartItems();
      }
      this.calcularTotal();
    });

    // Obtener el ID del usuario logeado
    this.id_usuario = this.userService.getUserIdFromLocalStorage();
    console.log('ID del usuario desde UserService:', this.id_usuario);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit llamado');
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('No se encontró el elemento del mapa.');
      return;
    }

    setTimeout(() => {
      this.map = L.map('map').setView([19.4326, -99.1332], 12); // CDMX
      console.log('Mapa inicializado:', this.map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.getUserLocation(); // Llamamos a la geolocalización después de inicializar el mapa
    }, 500);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy llamado');
    if (this.map) {
      this.map.remove(); // Limpiar el mapa al destruir el componente
    }
  }

  calcularTotal() {
    console.log('Calculando total...');
    this.total = this.productos.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );

    // Si la entrega es inmediata, agregar el costo adicional
    if (this.entregaInmediata) {
      this.total += this.costoExtraEntregaInmediata;
    }

    console.log('Total calculado:', this.total);
  }

  onDeliveryChange() {
    // Calcular el total nuevamente cuando se marque o desmarque la opción de entrega inmediata
    this.calcularTotal();
  }

  goToCart() {
    console.log('Navegando al carrito');
    this.router.navigate(['/carrito']);
  }

  goToProductDetails() {
    const productoId = this.productos.length === 1 ? this.productos[0].id_producto : null;
    console.log('ID del producto:', productoId);
    if (productoId) {
      this.router.navigate(['/product-details', productoId]);
    }
  }

  finalizarCompra() {
    console.log('Método de pago seleccionado:', this.metodoPagoSeleccionado);
  
    // Validación de datos antes de continuar con la compra
    if (!this.metodoPagoSeleccionado || this.metodoPagoSeleccionado.trim() === '') {
      alert('Por favor selecciona un método de pago.');
      return;
    }
  
    if (!this.validateShippingInfo()) {
      alert('Por favor completa todos los campos de envío.');
      return;
    }
  
    if (this.productos.length === 0) {
      alert('No hay productos en la compra.');
      return;
    }
  
    if (!this.id_usuario) {
      alert('No se pudo obtener el ID del usuario.');
      return;
    }
  
    const compra = {
      productos: this.productos,
      metodo_pago: this.metodoPagoSeleccionado,
      total: this.total,
      usuario_id: this.id_usuario,
      nombre_completo: this.nombre_completo,
      direccion: this.direccion,
      ciudad: this.ciudad,
      codigo_postal: this.codigo_postal,
      latitud: this.selectedLat,  // Usar latitud seleccionada
      longitud: this.selectedLng  // Usar longitud seleccionada
    };
  
    console.log('Compra a procesar:', compra);
  
    // Llamada al servicio para registrar la compra
    this.comprasService.registrarCompra(compra).subscribe(
      (response) => {
        console.log('Compra registrada con éxito:', response);
        alert('¡Compra realizada con éxito!');
        this.cartService.clearCart();  // Limpiar carrito
        this.router.navigate(['/tienda-online']);  // Navegar a la tienda
      },
      (error) => {
        console.error('Error registrando la compra:', error);
        alert('Ocurrió un error al procesar la compra. Revisa los detalles en consola.');
        console.log('Detalles del error:', error);
      }
    );
  }

  validateShippingInfo(): boolean {
    const isValid = !!(this.nombre_completo && this.direccion && this.ciudad && this.codigo_postal);
    console.log('Información de envío válida:', isValid);
    return isValid;
  }

  addMarker(lat: number, lng: number) {
    console.log('Añadiendo marcador en lat:', lat, 'lng:', lng);
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lng], { draggable: true })
      .addTo(this.map)
      .bindPopup('Ubicación seleccionada')
      .openPopup();

    this.map.setView([lat, lng], 15);

    // Evento para actualizar la ubicación cuando se mueva el marcador
    this.marker.on('dragend', (event: any) => {
      const marker = event.target;
      const position = marker.getLatLng();
      this.selectedLat = position.lat;
      this.selectedLng = position.lng;
      console.log('Nueva ubicación seleccionada:', this.selectedLat, this.selectedLng);
    });
  }

  getUserLocation() {
    console.log('Obteniendo ubicación del usuario...');
    if (!navigator.geolocation) {
      console.error('Geolocalización no es soportada en este navegador.');
      alert('Tu navegador no soporta la geolocalización.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;

        this.selectedLat = this.userLat;
        this.selectedLng = this.userLng;

        console.log('Ubicación del usuario:', this.userLat, this.userLng);
        this.addMarker(this.userLat, this.userLng);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        alert('No pudimos obtener tu ubicación. Asegúrate de otorgar permisos.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }
}
