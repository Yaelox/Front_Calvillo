import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-puntosdeventa',
  templateUrl: './puntosdeventa.page.html',
  styleUrls: ['./puntosdeventa.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HeaderComponent, FooterComponent],
})
export class PuntosdeventaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
