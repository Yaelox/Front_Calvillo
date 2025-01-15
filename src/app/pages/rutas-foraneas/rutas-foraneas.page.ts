import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from 'src/app/components/footer/footer.component';


@Component({
  selector: 'app-rutas-foraneas',
  templateUrl: './rutas-foraneas.page.html',
  styleUrls: ['./rutas-foraneas.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HeaderComponent,FooterComponent],
})
export class RutasForaneasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
