import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { CommonModule } from '@angular/common';

interface Semana {
  semana: string;
  ventas: string;
}

interface VentasPorSemana {
  mes: string;
  semanas: Semana[];
}


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  imports:[IonicModule,CommonModule],
})
export class EstadisticasPage implements OnInit {
 // Definimos las variables para almacenar los datos
 ventasZona: any[] = [];
 ventasMes: any[] = [];
 ventasSemana: any[] = [];
 ventasAnio: any[] = [];
 ventasDia: any[] = [];
 productoMasVendido: any = {};
 productoMasVendidoPorZona: any[] = [];

 @ViewChild('ventasPorAnioChart') ventasPorAnioChart: any;

 constructor(private estadisticasService: EstadisticasService) {}

 ngOnInit() {
   // Registrar las escalas y componentes de Chart.js
   Chart.register(...registerables);  // Esto registrará todos los componentes necesarios de Chart.js

   // Cargar las estadísticas al inicializar el componente
   this.loadVentasPorZona();
   this.loadVentasPorMes();
   this.loadVentasPorSemana();
   this.loadVentasPorAnio();
   this.loadVentasPorDia();
   this.loadProductoMasVendido();
   this.loadProductoMasVendidoPorZona();
 }

 // Obtener ventas por zona
 loadVentasPorZona() {
   this.estadisticasService.getVentasPorZona().subscribe((data) => {
     console.log('Ventas por Zona:', data);  // Añadir un log para ver qué se recibe
     this.ventasZona = data;
   }, error => {
     console.error('Error en getVentasPorZona:', error);
   });
 }

 // Obtener ventas por mes
 loadVentasPorMes() {
   this.estadisticasService.getVentasPorMes().subscribe((data) => {
     console.log('Ventas por Mes:', data);  // Añadir un log para ver qué se recibe
     this.ventasMes = data;
   }, error => {
     console.error('Error en getVentasPorMes:', error);
   });
 }

 // Obtener ventas por semana
 loadVentasPorSemana() {
  this.estadisticasService.getVentasPorSemana().subscribe((data: VentasPorSemana[]) => {
    console.log('Ventas por Semana:', data);

    // Extraer las semanas de los datos anidados
    this.ventasSemana = data.map(item => item.semanas).flat();

    console.log('Ventas por Semana (flattened):', this.ventasSemana); // Verifica la estructura
  });
}



 // Obtener ventas por año (gráfico)
 loadVentasPorAnio() {
   this.estadisticasService.getVentasPorAño().subscribe((data) => {
     console.log('Ventas por Año:', data);  // Añadir un log para ver qué se recibe
     this.ventasAnio = data;
     this.renderVentasPorAnioChart();
   }, error => {
     console.error('Error en getVentasPorAño:', error);
   });
 }

 // Obtener ventas por día
 loadVentasPorDia() {
   this.estadisticasService.getVentasPorDia().subscribe((data) => {
     console.log('Ventas por Día:', data);  // Añadir un log para ver qué se recibe
     this.ventasDia = data;
   }, error => {
     console.error('Error en getVentasPorDia:', error);
   });
 }

 // Obtener producto más vendido
 loadProductoMasVendido() {
   this.estadisticasService.getProductoMasVendido().subscribe((data) => {
     console.log('Producto Más Vendido:', data);  // Añadir un log para ver qué se recibe
     this.productoMasVendido = data;
   }, error => {
     console.error('Error en getProductoMasVendido:', error);
   });
 }

 // Obtener producto más vendido por zona
 loadProductoMasVendidoPorZona() {
   this.estadisticasService.getProductoMasVendidoPorZona().subscribe((data) => {
     console.log('Producto Más Vendido por Zona:', data);  // Añadir un log para ver qué se recibe
     this.productoMasVendidoPorZona = data;
   }, error => {
     console.error('Error en getProductoMasVendidoPorZona:', error);
   });
 }

 // Renderizar gráfico de ventas por año
 renderVentasPorAnioChart() {
   console.log('Renderizando gráfico de ventas por año');
   const años = this.ventasAnio.map(item => item.anio);
   const ventas = this.ventasAnio.map(item => item.total_vendido);

   new Chart(this.ventasPorAnioChart.nativeElement, {
     type: 'bar',
     data: {
       labels: años,
       datasets: [
         {
           label: 'Ventas por Año',
           data: ventas,
           backgroundColor: 'rgba(75, 192, 192, 0.2)',
           borderColor: 'rgba(75, 192, 192, 1)',
           borderWidth: 1
         }
       ]
     },
     options: {
       scales: {
         y: {
           type: 'linear',  // Registrar la escala lineal de forma explícita
           beginAtZero: true
         }
       }
     }
   });
 }

 // Descargar la información como PDF
 downloadPDF() {
   const doc = new jsPDF();

   // Agregar título
   doc.setFontSize(18);
   doc.text('Estadísticas de Ventas', 10, 10);

   // Ventas por zona
   doc.setFontSize(12);
   doc.text('Ventas por Zona:', 10, 20);
   let yPosition = 30;
   this.ventasZona.forEach(zona => {
     doc.text(`Zona: ${zona.zona}, Producto: ${zona.producto}, Total Vendido: ${zona.total_vendido}`, 10, yPosition);
     yPosition += 10;
   });

   // Ventas por mes
   doc.text('Ventas por Mes:', 10, yPosition);
   yPosition += 10;
   this.ventasMes.forEach(mes => {
     doc.text(`Mes: ${mes.mes}, Total Vendido: ${mes.total_vendido}`, 10, yPosition);
     yPosition += 10;
   });

   // Producto más vendido
   doc.text(`Producto más vendido: ${this.productoMasVendido.producto}, Total Vendido: ${this.productoMasVendido.total_vendido}`, 10, yPosition);

   // Guardar el PDF
   doc.save('estadisticas_ventas.pdf');
 }
}
