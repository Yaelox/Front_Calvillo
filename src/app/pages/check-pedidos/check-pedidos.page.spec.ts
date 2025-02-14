import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckPedidosPage } from './check-pedidos.page';

describe('CheckPedidosPage', () => {
  let component: CheckPedidosPage;
  let fixture: ComponentFixture<CheckPedidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
