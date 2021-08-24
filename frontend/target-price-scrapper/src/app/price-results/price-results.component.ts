import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { PriceResult } from '../models/priceResult.model';
import { PriceResultService } from './price-result.service';

@Component({
  selector: 'app-price-results',
  templateUrl: './price-results.component.html',
  styleUrls: ['./price-results.component.css']
})
export class PriceResultsComponent implements OnInit {

  priceResultModel: PriceResult;
  //filteredOptions: Observable<PriceResult>;
  private priceResultSub: Subscription;
  private loaderSub: Subscription;
  loader:boolean = false;
  constructor(private priceResultService: PriceResultService) {
    this.loaderSub = this.priceResultService.getUpdatedLoaderiscener().subscribe((serviceLoader: {isLoading:boolean}) => {
      this.loader = serviceLoader.isLoading;
    })
    this.priceResultSub = this.priceResultService.getUpdatedPriceResultLiscener().subscribe((priceData: { priceResult: PriceResult }) => {     
      this.priceResultModel = priceData.priceResult;
    });
  }                

  ngOnInit(): void {
   
  }

}
