import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-envios',
  templateUrl: './check-envios.page.html',
  styleUrls: ['./check-envios.page.scss'],
  standalone:true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckEnviosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
