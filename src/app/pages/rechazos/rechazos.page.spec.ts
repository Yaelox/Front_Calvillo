import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RechazosPage } from './rechazos.page';

describe('RechazosPage', () => {
  let component: RechazosPage;
  let fixture: ComponentFixture<RechazosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
