import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepartoDomicilioPage } from './reparto-domicilio.page';

describe('RepartoDomicilioPage', () => {
  let component: RepartoDomicilioPage;
  let fixture: ComponentFixture<RepartoDomicilioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartoDomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
