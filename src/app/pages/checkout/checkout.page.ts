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

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent,FormsModule,ReactiveFormsModule,IonicModule]
})
export class CheckoutPage implements OnInit, AfterViewInit, OnDestroy {
  productos: any[] = []; 
  total: number = 0;
  selectedLat: number | null = null;
  selectedLng: number | null = null;
  
  shippingInfo = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    lat: null,
    lng: null,
  };

  metodoPagoSeleccionado: string = '';
  userLat: number | null = null;
  userLng: number | null = null;
  map: any;
  marker: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private comprasService: ComprasService
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
        this.productos = [producto];
      } else if (params['fromCart']) {
        this.productos = this.cartService.getCartItems();
        console.log('Productos del carrito:', this.productos);
      }
      this.calcularTotal();
    });
  }

  // ✅ Método obligatorio para AfterViewInit
  ngAfterViewInit() {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('No se encontró el elemento del mapa.');
      return;
    }

    setTimeout(() => {
      this.map = L.map('map').setView([19.4326, -99.1332], 12); // CDMX

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.getUserLocation(); // Llamamos a la geolocalización después de inicializar el mapa
    }, 500);
  }

  // ✅ Método obligatorio para OnDestroy
  ngOnDestroy() {
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
    console.log('Total calculado:', this.total);
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
  
    if (!this.metodoPagoSeleccionado || this.metodoPagoSeleccionado.trim() === '') {
      alert('Por favor selecciona un método de pago.');
      return;
    }
  
    if (!this.validateShippingInfo()) {
      alert('Por favor completa todos los campos de envío.');
      return;
    }
  
    const compra = {
      productos: this.productos,
      shippingInfo: this.shippingInfo,
      metodoPago: this.metodoPagoSeleccionado,
      ubicacion: { lat: this.userLat, lng: this.userLng },
      total: this.total,
    };
  
    this.comprasService.registrarCompra(compra).subscribe(
      (response) => {
        console.log('Compra registrada con éxito:', response);
        alert('¡Compra realizada con éxito!');
        this.cartService.clearCart(); // Borra el carrito después de la compra
        this.router.navigate(['/confirmacion-compra']); // Redirige a una página de confirmación
      },
      (error) => {
        console.error('Error registrando la compra:', error);
        alert('Ocurrió un error al procesar la compra.');
      }
    );
  }  

  validateShippingInfo(): boolean {
    const { fullName, address, city, postalCode } = this.shippingInfo;
    return !!(fullName && address && city && postalCode);
  }

  addMarker(lat: number, lng: number) {
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
