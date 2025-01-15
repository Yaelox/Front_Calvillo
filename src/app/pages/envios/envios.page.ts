import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-envios',
  templateUrl: './envios.page.html',
  styleUrls: ['./envios.page.scss'],
  imports: [CommonModule, HeaderComponent, FooterComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EnviosPage {

  // Datos simulados para los envíos
  enviosLocales = [
    { id: 1, destino: 'Ciudad Local 1', estado: 'Pendiente' },
    { id: 2, destino: 'Ciudad Local 2', estado: 'En tránsito' },
    { id: 3, destino: 'Ciudad Local 3', estado: 'Entregado' },
  ];

  enviosNacionales = [
    { id: 1, destino: 'Ciudad Nacional 1', estado: 'Pendiente' },
    { id: 2, destino: 'Ciudad Nacional 2', estado: 'En tránsito' },
  ];

  enviosInternacionales = [
    { id: 1, destino: 'País Internacional 1', estado: 'Pendiente' },
    { id: 2, destino: 'País Internacional 2', estado: 'En tránsito' },
  ];

  // Métodos para la administración de logística
  verEnviosPendientes() {
    console.log('Verificando envíos pendientes...');
  }

  realizarSeguimiento() {
    console.log('Realizando seguimiento de envíos...');
  }

  asignarPaqueteria() {
    console.log('Asignando paquetería...');
  }
}
