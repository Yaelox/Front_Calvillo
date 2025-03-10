import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecadorPage } from './checador.page';

describe('ChecadorPage', () => {
  let component: ChecadorPage;
  let fixture: ComponentFixture<ChecadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
