import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-subirmeta',
  standalone:true,
  templateUrl: './subirmeta.page.html',
  styleUrls: ['./subirmeta.page.scss'],
  imports:[CommonModule,IonicModule,ReactiveFormsModule,FormsModule,HeaderComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SubirmetaPage implements OnInit {


  metaExistente: boolean = false;
  metaActual: number = 0;
  nuevaMeta: number | null = null;
  mensaje: string = '';

  constructor(private metasService: MetaService) {}

  ngOnInit() {
    this.verificarMeta();
  }

  verificarMeta() {
    this.metasService.getMetaDelDia().subscribe({
      next: (res) => {
        if (res.meta) {
          this.metaExistente = true;
          this.metaActual = res.meta;
          this.mensaje = `Ya se estableció la meta de hoy: ${this.metaActual} contenedores.`;
        }
      },
      error: (err) => {
        console.error('Error al verificar la meta:', err);
      }
    });
  }

  recargarPagina() {
    window.location.reload();
  }
  
  guardarMeta() {
    if (this.nuevaMeta == null || this.nuevaMeta <= 0) {
      this.mensaje = 'Ingresa una meta válida';
      return;
    }

    this.metasService.postMetadeldia(this.nuevaMeta).subscribe({
      next: (res) => {
        this.metaExistente = true;
        this.metaActual = this.nuevaMeta!;
        this.mensaje = 'Meta del día guardada correctamente';
        this.nuevaMeta = null;
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al guardar la meta';
      }
    });
  }
}