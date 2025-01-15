import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-reparto-domicilio',
  templateUrl: './reparto-domicilio.page.html',
  styleUrls: ['./reparto-domicilio.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HeaderComponent,FooterComponent],
})
export class RepartoDomicilioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
