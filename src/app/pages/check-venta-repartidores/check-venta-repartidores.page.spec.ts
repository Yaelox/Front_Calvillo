import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckVentaRepartidoresPage } from './check-venta-repartidores.page';

describe('CheckVentaRepartidoresPage', () => {
  let component: CheckVentaRepartidoresPage;
  let fixture: ComponentFixture<CheckVentaRepartidoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckVentaRepartidoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
