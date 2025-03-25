import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import html2pdf from 'html2pdf.js';
import 'jspdf-autotable';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { CommonModule } from '@angular/common';

interface Semana {
  semana: number;
  ventas: number;
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EstadisticasPage implements OnInit {
  ventasZona: any[] = [];
  ventasMes: any[] = [];
  ventasSemana: any[] = [];
  ventasAnio: any[] = [];
  ventasDia: any[] = [];
  productoMasVendido: any = {};
  productoMasVendidoPorZona: any[] = [];
  isLoaded: boolean = false;

  constructor(private estadisticasService: EstadisticasService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    Chart.register(...registerables);

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
      this.checkDataLoaded();
    });
  }

  loadVentasPorMes() {
    this.estadisticasService.getVentasPorMes().subscribe((data) => {
      this.ventasMes = data;
      this.checkDataLoaded();
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
      this.checkDataLoaded();
    });
  }

  loadVentasPorAnio() {
    this.estadisticasService.getVentasPorAño().subscribe((data) => {
      this.ventasAnio = data;
      this.checkDataLoaded();
    });
  }

  loadVentasPorDia() {
    this.estadisticasService.getVentasPorDia().subscribe((data) => {
      this.ventasDia = data;
      this.checkDataLoaded();
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
      this.checkDataLoaded();
    });
  }

  async loadProductoMasVendidoPorZona() {
    try {
      const data: any = await this.estadisticasService.getProductoMasVendidoPorZona().toPromise();
      if (data && Array.isArray(data)) {
        this.productoMasVendidoPorZona = data;
      } else if (data) {
        this.productoMasVendidoPorZona = [data];
      } else {
        this.productoMasVendidoPorZona = [];
      }
      this.checkDataLoaded();
    } catch (error) {
      console.error('Error al obtener productos más vendidos por zona:', error);
      this.productoMasVendidoPorZona = [];
    }
  }

  checkDataLoaded() {
    if (
      this.ventasZona.length > 0 &&
      this.ventasMes.length > 0 &&
      this.ventasSemana.length > 0 &&
      this.ventasAnio.length > 0 &&
      this.ventasDia.length > 0 &&
      Object.keys(this.productoMasVendido).length > 0 &&
      this.productoMasVendidoPorZona.length > 0
    ) {
      this.isLoaded = true;
    }
  }

  downloadPDF() {
    if (!this.isLoaded) {
      console.log("Esperando que los datos se carguen...");
      return;
    }
  
    // Forzar la actualización del componente y verificar si el DOM está listo
    this.cdr.detectChanges();
  
    // Asegurémonos de que los datos estén renderizados antes de crear el PDF
    setTimeout(() => {
      const element = document.getElementById('inner-content');
      if (element) {
        const options = {
          margin: [10, 10, 10, 10], // Márgenes ajustados
          filename: 'estadisticas_de_ventas.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 4,  // Aumentar la escala para más detalle
            width: element.scrollWidth,   // Ajuste automático al ancho del contenido
            height: element.scrollHeight,  // Ajuste automático al alto del contenido
            x: 0,  // Centrado horizontal
            y: 0   // Centrado vertical
          },
          jsPDF: { 
            unit: 'mm',  // Usar milímetros para mayor precisión
            format: 'a4', // A4 es un buen formato estándar
            orientation: 'portrait',
            compress: true,
            putOnlyUsedFonts: true,
            pageSize: 'A4', // Asegurar que la página es A4
            autoSize: true, // Ajustar al tamaño de la página
            html2canvas: {
              scale: 3, // Este valor ajusta la calidad y el tamaño
            }
          }
        };

        // Esto oculta el botón de impresión, asegurando que no se incluya en el PDF
        const printButton = document.getElementById('print-button');
        if (printButton) {
          printButton.style.display = 'none';
        }

        // Generación del PDF
        html2pdf()
          .from(element)
          .set(options)
          .save()
          .finally(() => {
            // Restauramos el botón de impresión
            if (printButton) {
              printButton.style.display = 'block';
            }
          });
      } else {
        console.error('Element not found!');
      }
    }, 500); // Espera 500ms para asegurarse de que el DOM se haya renderizado completamente
  }
}
