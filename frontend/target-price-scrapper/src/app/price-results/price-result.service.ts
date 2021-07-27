import { Injectable, OnInit } from '@angular/core';
import {PriceResult} from '../models/priceResult.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SelectStockService } from '../select-stock/select-stock.service';
import { Finviz } from '../models/finviz.model';


@Injectable({
    providedIn: 'root',
})
export class PriceResultService  {
    private finvizModel = new Finviz();
    private priceResult = new PriceResult();
    private priceResultSubjet = new Subject<{priceResult :PriceResult}>();


    constructor(private http: HttpClient) { 
       
    }

    GetStockSymbol(stockSymbol: string):void {
        if(stockSymbol) {
            this.searchStockPrice(stockSymbol);
        }
    }


    searchStockPrice(stocksymbol: string) : void {
        this.http.post<any>("http://127.0.0.1:5000/searchstock",{ stockSymbol: stocksymbol }).subscribe(res => {
            if(res) {
                let finviz = JSON.parse(res);
                if(finviz.price === "-") return;
                this.finvizModel.targetPrice = finviz.price;
                this.priceResult.finviz = this.finvizModel;
                this.priceResultSubjet.next({priceResult: this.priceResult })
            }
        },(err:HttpErrorResponse)=>{
            console.log(err);
        });

    }

    getUpdatedPriceResultLiscener() {
        return this.priceResultSubjet.asObservable();
    }
}