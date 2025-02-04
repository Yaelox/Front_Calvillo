import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.page.html',
  styleUrls: ['./tiendas.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TiendasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
