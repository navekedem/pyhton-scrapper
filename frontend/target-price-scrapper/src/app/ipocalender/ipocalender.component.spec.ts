import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpocalenderComponent } from './ipocalender.component';

describe('IpocalenderComponent', () => {
  let component: IpocalenderComponent;
  let fixture: ComponentFixture<IpocalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpocalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpocalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
