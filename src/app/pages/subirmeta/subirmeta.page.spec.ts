import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubirmetaPage } from './subirmeta.page';

describe('SubirmetaPage', () => {
  let component: SubirmetaPage;
  let fixture: ComponentFixture<SubirmetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirmetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
