import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import 'swiper/swiper-bundle.css'
import SwiperCore, {
  Navigation,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
} from "swiper/core";

// install Swiper components
SwiperCore.use([
  Navigation,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-logo-swiper',
  templateUrl: './logo-swiper.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./logo-swiper.component.css']
})
export class LogoSwiperComponent implements OnInit {
  @ViewChild("swiperRef", { static: false }) swiperRef?: SwiperComponent;
  show: boolean;
  thumbs: any;
  swiperConfig: any = {
    slidesPerView: 2,
    autoplay: true,
    loop:true,
    breakpoints: {
      768: {
        spaceBetween: 20,
        slidesPerView: 3,
      }
    }
  }
  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit() { }

  controlledSwiper: any;
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper;
  }

  exampleConfig = { slidesPerView: 4 };
  slidesPerView: number = 4;

  navigation = false;
  toggleNavigation() {
    this.navigation = !this.navigation;
  }

  breakpoints = {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 30 }
  };

  log(string) {
    // console.log(string);
  }

  breakPointsToggle: boolean;
  breakpointChange() {
    this.breakPointsToggle = !this.breakPointsToggle;
    this.breakpoints = {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 40 },
      1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 30 }
    };
  }
}
