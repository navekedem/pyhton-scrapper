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
    private priceResult = new PriceResult();
    private priceResultSubjet = new Subject<{priceResult :PriceResult}>();
    private loaderSubject =  new Subject<{isLoading: boolean}>();

    constructor(private http: HttpClient) { 
       
    }

    GetStockSymbol(stockSymbol: string,companyName:string):void {
        if(stockSymbol) {
            this.searchStockPrice(stockSymbol,this.filterCompanyName(companyName));
        }
    }


    searchStockPrice(stocksymbol: string,companyName:string) : void {
        this.loaderSubject.next({isLoading: true})
        this.http.post<any>("http://127.0.0.1:5000/searchstock",{ stockSymbol: stocksymbol,companyName:companyName }).subscribe(res => {
            if(res) {
                let priceResult = JSON.parse(res);
                if(!priceResult) return;
                // this.finvizModel.targetPrice = priceResult.Finviz.price;
                this.priceResult = this.convertPriceResponseToViewModel(priceResult);
                this.priceResultSubjet.next({priceResult: this.priceResult })
                this.loaderSubject.next({isLoading: false})
            }
        },(err:HttpErrorResponse)=>{
            console.log(err);
        });

    }
    filterCompanyName(companyName:string) : string{
        return companyName.split(' ')[0];
    }
    getUpdatedPriceResultLiscener() {
        return this.priceResultSubjet.asObservable();
    }      
    getUpdatedLoaderiscener() {
        return this.loaderSubject.asObservable();
    }       
    convertPriceResponseToViewModel(responseModel: any) : PriceResult {
        console.log(responseModel);
        let tempPriceResult:PriceResult = new PriceResult();
        let tempfinviz;
        let tempTipRanks;
        let tempWsj;
        if(responseModel.finviz) {
            tempfinviz = JSON.parse(responseModel.finviz);
        }
        if(responseModel.tipRanks) {
            tempTipRanks = JSON.parse(responseModel.tipRanks);
        }
        if(responseModel.tipRanks) {
            tempWsj = JSON.parse(responseModel.wsj);
        }
        tempPriceResult.companyLogoSrc = responseModel.companyLogoSrc;
        tempPriceResult.finviz.targetPrice = tempfinviz.price;
        //TipRanks
        tempPriceResult.tipRanks.high = tempTipRanks.high;
        tempPriceResult.tipRanks.average = tempTipRanks.mid;
        tempPriceResult.tipRanks.lowest = tempTipRanks.low;
        //Wsj
        tempPriceResult.wsj.high = tempWsj.high;
        tempPriceResult.wsj.average = tempWsj.mid;
        tempPriceResult.wsj.lowest = tempWsj.low;
        return tempPriceResult;
    }
}