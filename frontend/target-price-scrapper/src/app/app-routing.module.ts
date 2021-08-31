import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component'
import { IpocalenderComponent } from './ipocalender/ipocalender.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },  
  { path: 'ipocalender', component: IpocalenderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
