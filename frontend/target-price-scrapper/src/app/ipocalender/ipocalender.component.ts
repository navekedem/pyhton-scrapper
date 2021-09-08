import { Component, OnInit, Renderer2 } from '@angular/core';
import { Ipo } from '../models/ipo.model';
import { IpoService } from './ipocalender.service';

@Component({
  selector: 'app-ipocalender',
  templateUrl: './ipocalender.component.html',
  styleUrls: ['./ipocalender.component.css']
})
export class IpocalenderComponent implements OnInit {
  selectedMonth: number = -1;
  monthlyIpos: Ipo[]
  months = [
    { value: 0, viewValue: 'January' },
    { value: 1, viewValue: 'February' },
    { value: 2, viewValue: 'March' },
    { value: 3, viewValue: 'April' },
    { value: 4, viewValue: 'May' },
    { value: 5, viewValue: 'June' },
    { value: 6, viewValue: 'July' },
    { value: 7, viewValue: 'August' },
    { value: 8, viewValue: 'September' },
    { value: 9, viewValue: 'October' },
    { value: 10, viewValue: 'November' },
    { value: 11, viewValue: 'December' },
  ];

  constructor(private ipoService: IpoService,private renderer: Renderer2) {
   

  }

  ngOnInit(): void {
    var date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.ipoService.getIpoArray(firstDay.toISOString().slice(0, 10), lastDay.toISOString().slice(0, 10));
    this.ipoService.getUpdatedIpoLiscener().subscribe((ipoData: { ipoArray: Ipo[] }) => {
        if(ipoData.ipoArray.length > 0) {
          if(document.getElementsByTagName('footer')[0].classList.contains('footer-bottom')){
            this.renderer.removeClass(document.getElementsByClassName('footer-bottom')[0], 'footer-bottom');
          }
          this.monthlyIpos = ipoData.ipoArray;
        }
    })
  }

}
