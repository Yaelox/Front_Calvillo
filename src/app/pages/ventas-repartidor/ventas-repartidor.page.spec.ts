import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentasRepartidorPage } from './ventas-repartidor.page';

describe('VentasRepartidorPage', () => {
  let component: VentasRepartidorPage;
  let fixture: ComponentFixture<VentasRepartidorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
