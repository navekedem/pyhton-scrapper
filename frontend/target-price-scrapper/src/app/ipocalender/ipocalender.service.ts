import { Injectable, OnInit } from '@angular/core';
import {PriceResult} from '../models/priceResult.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Ipo } from '../models/ipo.model';



@Injectable({
    providedIn: 'root',
})
export class IpoService  {
    private priceResult = new PriceResult();
    private ipoArraySubject = new Subject<{ipoArray :Ipo[]}>();
    private loaderSubject =  new Subject<{isLoading: boolean}>();

    constructor(private http: HttpClient) { 
       
    }



    getIpoArray(from: string,to:string) : void {
        //this.loaderSubject.next({isLoading: true})
        this.http.post<Ipo[]>("http://127.0.0.1:5000/getipo",{ from: from,to:to }).subscribe(res => {
            if(res) {
                this.ipoArraySubject.next({ipoArray:res});
            }
        },(err:HttpErrorResponse)=>{
            console.log(err);
        });

    }
  
    getUpdatedIpoLiscener() {
        return this.ipoArraySubject.asObservable();
    }      
    getUpdatedLoaderiscener() {
        return this.loaderSubject.asObservable();
    }       

}