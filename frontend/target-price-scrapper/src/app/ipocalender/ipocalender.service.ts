import { Injectable, OnInit } from '@angular/core';
import {PriceResult} from '../models/priceResult.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class IpoService  {
    private priceResult = new PriceResult();
    private priceResultSubjet = new Subject<{priceResult :PriceResult}>();
    private loaderSubject =  new Subject<{isLoading: boolean}>();

    constructor(private http: HttpClient) { 
       
    }



    getIpoArray(from: string,to:string) : void {
        //this.loaderSubject.next({isLoading: true})
        this.http.post<any>("http://127.0.0.1:5000/getipo",{ from: from,to:to }).subscribe(res => {
            if(res) {
                console.log(res)
                let priceResult = JSON.parse(res);
                if(!priceResult) return;
            }
        },(err:HttpErrorResponse)=>{
            console.log(err);
        });

    }
  
    getUpdatedPriceResultLiscener() {
        return this.priceResultSubjet.asObservable();
    }      
    getUpdatedLoaderiscener() {
        return this.loaderSubject.asObservable();
    }       

}