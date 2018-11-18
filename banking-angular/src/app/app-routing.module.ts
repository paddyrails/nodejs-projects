import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { TradingbooksComponent } from './tradingbooks/tradingbooks.component';
import { TradingbookDetailComponent } from './tradingbooks/tradingbook-detail/tradingbook-detail.component';


const appRoutes: Routes = [
  { path: '', redirectTo: "/reports", pathMatch:"full"},
  { path: 'reports', component: TradingbooksComponent, children: [
      { path : ':id', component: TradingbookDetailComponent }
    ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
