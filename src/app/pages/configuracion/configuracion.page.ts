import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderConfigComponent } from "../../components/header-config/header-config.component";
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [CommonModule,HeaderConfigComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguracionPage implements OnInit {

  constructor(
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(true);  // Habilitar el menú
  }

  ngOnDestroy() {
    // Desactivar el menú si es necesario al salir de la página
    this.menuCtrl.enable(false);
  }
}