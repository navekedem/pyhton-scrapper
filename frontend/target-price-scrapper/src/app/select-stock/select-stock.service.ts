import { Injectable, OnInit } from '@angular/core';
import { Stock } from '../models/stock.model';
import {PriceResult} from '../models/priceResult.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { Finviz } from '../models/finviz.model';
import { PriceResultService } from '../price-results/price-result.service';



@Injectable({
    providedIn: 'root',
})
export class SelectStockService  {
    private stockList: Stock[];
    private stockListSubjet = new Subject<{stockList :Stock[]}>();
    private finvizModel: Finviz;
    private priceResult: PriceResult;
    private priceResultSubjet = new Subject<{priceResult :PriceResult}>();

    constructor(private http: HttpClient,private priceResultService: PriceResultService) { 
       
    }

    getStocksList(): void {
        this.http.get<any>("http://127.0.0.1:5000/loadstocks").subscribe(res => {
            this.stockList = res.map(({ description, displaySymbol }) => ({ description, displaySymbol }));
            this.stockListSubjet.next({stockList: [...this.stockList]});
        });
    }
    getUpdatedStockListLiscener() {
      return this.stockListSubjet.asObservable();
    }

    updatePriceResult(stocksymbol: string) : void {
        this.priceResultService.GetStockSymbol(stocksymbol);
    }

}