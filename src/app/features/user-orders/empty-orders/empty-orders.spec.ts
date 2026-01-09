import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyOrders } from './empty-orders';

describe('EmptyOrders', () => {
  let component: EmptyOrders;
  let fixture: ComponentFixture<EmptyOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
