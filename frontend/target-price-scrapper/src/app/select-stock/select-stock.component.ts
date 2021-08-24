import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Stock } from '../models/stock.model';
import { SelectStockService } from './select-stock.service';

@Component({
  selector: 'app-select-stock',
  templateUrl: './select-stock.component.html',
  styleUrls: ['./select-stock.component.css']
})
export class SelectStockComponent implements OnInit {
  searchStockControl = new FormControl();
  stocks: Stock[];
  filteredOptions: Observable<Stock[]>;
  private stocksSub: Subscription;

  constructor(public stockService: SelectStockService) { }

  ngOnInit(): void {
    this.stockService.getStocksList();
    this.stocksSub = this.stockService.getUpdatedStockListLiscener().subscribe((stockData: { stockList: Stock[] }) => {
      this.stocks = stockData.stockList;
      this.filteredOptions = this.searchStockControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.displaySymbol),
          map(name => name ? this._filter(name) : this.stocks.slice(0,10))
        );
    });
  }
  displayFn(stock: Stock): string {
    return stock && stock.displaySymbol ? stock.displaySymbol : '';
  }

  private _filter(name: string): Stock[] {
    //console.log(this.stocks);
    const filterValue = name.toLowerCase();
    return this.stocks.filter(option => option.displaySymbol.toLowerCase().indexOf(filterValue) === 0 || option.description.toLowerCase().indexOf(filterValue) === 0).slice(0,10);
  }

  getStock(stockName:Stock) {
   this.stockService.updatePriceResult(stockName.displaySymbol,stockName.description);
  }
}


