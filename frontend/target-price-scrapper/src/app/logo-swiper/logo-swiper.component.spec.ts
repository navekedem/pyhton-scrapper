import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSwiperComponent } from './logo-swiper.component';

describe('LogoSwiperComponent', () => {
  let component: LogoSwiperComponent;
  let fixture: ComponentFixture<LogoSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
