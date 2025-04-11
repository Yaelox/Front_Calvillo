import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotosAlmacenPage } from './fotos-almacen.page';

describe('FotosAlmacenPage', () => {
  let component: FotosAlmacenPage;
  let fixture: ComponentFixture<FotosAlmacenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosAlmacenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
