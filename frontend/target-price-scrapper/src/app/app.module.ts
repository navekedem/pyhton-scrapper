import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectStockComponent } from './select-stock/select-stock.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'
import { HttpClientModule } from '@angular/common/http';
import { LogoSwiperComponent } from './logo-swiper/logo-swiper.component';
import { PriceResultsComponent } from './price-results/price-results.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HomepageComponent } from './homepage/homepage.component';
import { IpocalenderComponent } from './ipocalender/ipocalender.component'


@NgModule({
  declarations: [
    AppComponent,
    SelectStockComponent,
    LogoSwiperComponent,
    PriceResultsComponent,
    HomepageComponent,
    IpocalenderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    SwiperModule,
    MatFormFieldModule, 
    MatInputModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
