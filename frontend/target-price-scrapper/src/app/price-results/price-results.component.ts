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

  constructor(private priceResultService: PriceResultService) {
    this.priceResultSub = this.priceResultService.getUpdatedPriceResultLiscener().subscribe((priceData: { priceResult: PriceResult }) => {
      this.priceResultModel = priceData.priceResult;
      console.log(this.priceResultModel);
    });
  }                

  ngOnInit(): void {
  }

}
