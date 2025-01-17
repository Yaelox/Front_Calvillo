import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preventa',
  templateUrl: './preventa.page.html',
  styleUrls: ['./preventa.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HeaderComponent, 
    FooterComponent,
     CommonModule,
     ],
})
export class PreventaPage {


  constructor(
    private router: Router
  ) {}

  navigateToMapa() {
    this.router.navigate(['/mapa']);
  }

}