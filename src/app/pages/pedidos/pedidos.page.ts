import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PedidosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
