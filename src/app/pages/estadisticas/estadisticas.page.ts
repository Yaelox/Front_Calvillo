import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import html2pdf from 'html2pdf.js';
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
  imports: [IonicModule, CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class EstadisticasPage implements OnInit {
  ventasZona: any[] = [];
  ventasMes: any[] = [];
  ventasSemana: any[] = [];
  ventasAnio: any[] = [];
  ventasDia: any[] = [];
  productoMasVendido: any = {};
  productoMasVendidoPorZona: any[] = [];

  @ViewChild('ventasPorAñoChart') ventasPorAnioChart: any;

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit() {
    Chart.register(...registerables);  // Registrar Chart.js

    this.loadVentasPorZona();
    this.loadVentasPorMes();
    this.loadVentasPorSemana();
    this.loadVentasPorAnio();
    this.loadVentasPorDia();
    this.loadProductoMasVendido();
    this.loadProductoMasVendidoPorZona();
  }

  loadVentasPorZona() {
    this.estadisticasService.getVentasPorZona().subscribe((data) => {
      this.ventasZona = data;
    });
  }

  loadVentasPorMes() {
    this.estadisticasService.getVentasPorMes().subscribe((data) => {
      this.ventasMes = data;
    });
  }

  loadVentasPorSemana() {
    this.estadisticasService.getVentasPorSemana().subscribe((data: VentasPorSemana[]) => {
      this.ventasSemana = data.map(item => ({
        mes: item.mes,
        semanas: item.semanas.map(semana => ({
          semana: semana.semana,
          ventas: semana.ventas,
        })),
      }));
    });
  }

  loadVentasPorAnio() {
    this.estadisticasService.getVentasPorAño().subscribe((data) => {
      this.ventasAnio = data;
    });
  }

  loadVentasPorDia() {
    this.estadisticasService.getVentasPorDia().subscribe((data) => {
      this.ventasDia = data;
    });
  }

  loadProductoMasVendido() {
    this.estadisticasService.getProductoMasVendido().subscribe((data: any[]) => {
      this.productoMasVendido = data
        .map((item: any) => ({
          producto: item.producto,
          total_vendido: Number(item.total_vendido),
        }))
        .sort((a, b) => b.total_vendido - a.total_vendido);
    });
  }

  async loadProductoMasVendidoPorZona() {
    try {
      const data: any = await this.estadisticasService.getProductoMasVendidoPorZona().toPromise();
  
      // Verificamos si los datos son válidos
      if (data && Array.isArray(data)) {
        this.productoMasVendidoPorZona = data;
      } else if (data) {
        // Si los datos no son un array pero existen, los envolvemos en un array
        this.productoMasVendidoPorZona = [data];
      } else {
        // Si no hay datos, establecer como vacío
        this.productoMasVendidoPorZona = [];
      }
    } catch (error) {
      console.error('Error al obtener productos más vendidos por zona:', error);
      this.productoMasVendidoPorZona = []; // Establecer como vacío si hay error
    }
  }
  

  downloadPDF() {
    const element = document.getElementById('main-content');
    console.log(element);  // Verify the element in the console
    
    if (element) {
      const options = {
        margin: 1,
        filename: 'estadisticas_de_ventas.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
  
      html2pdf()
        .from(element)
        .set(options)
        .save();
    } else {
      console.error('Element not found!');
    }
  }
}  