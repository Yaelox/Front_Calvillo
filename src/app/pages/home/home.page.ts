import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:true,
  imports:[CommonModule,HeaderComponent,FooterComponent,IonicModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {

  constructor() {}

  recargarPagina() {
    window.location.reload();
  }
  
}
