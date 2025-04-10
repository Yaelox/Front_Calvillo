import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetaDelDiaPage } from './meta-del-dia.page';

describe('MetaDelDiaPage', () => {
  let component: MetaDelDiaPage;
  let fixture: ComponentFixture<MetaDelDiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaDelDiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
