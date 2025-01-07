import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiendaOnlinePage } from './tienda-online.page';

describe('TiendaOnlinePage', () => {
  let component: TiendaOnlinePage;
  let fixture: ComponentFixture<TiendaOnlinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaOnlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
