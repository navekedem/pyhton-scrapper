import { Renderer2 } from '@angular/core';
import {Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NavigationStart, NavigationError, NavigationEnd } from '@angular/router';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'target-price-scrapper';
  
  constructor(private router: Router,private renderer: Renderer2) {
    //Router subscriber
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          this.renderer.addClass(document.getElementsByTagName('footer')[0], 'footer-bottom');
        }

        if (event instanceof NavigationError) {
            // Handle error
            console.error(event.error);
        }

        if (event instanceof NavigationEnd) {
            //do something on end activity
        }
    });
}


  ngOnInit() : void {
    AOS.init();
  }
  
}
