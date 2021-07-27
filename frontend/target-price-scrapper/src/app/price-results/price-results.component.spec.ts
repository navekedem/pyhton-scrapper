import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceResultsComponent } from './price-results.component';

describe('PriceResultsComponent', () => {
  let component: PriceResultsComponent;
  let fixture: ComponentFixture<PriceResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
