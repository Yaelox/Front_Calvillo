import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  imports:[CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
