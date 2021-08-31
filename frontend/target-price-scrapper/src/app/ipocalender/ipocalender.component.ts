import { Component, OnInit } from '@angular/core';
import { IpoService } from './ipocalender.service';

@Component({
  selector: 'app-ipocalender',
  templateUrl: './ipocalender.component.html',
  styleUrls: ['./ipocalender.component.css']
})
export class IpocalenderComponent implements OnInit {

  constructor(private ipoService:IpoService) { }

  ngOnInit(): void {
    var date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.ipoService.getIpoArray(firstDay.toISOString().slice(0,10),lastDay.toISOString().slice(0,10));
  }

}
