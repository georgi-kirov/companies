import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent } from './components/company/company/company.component';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// *** PrimeNg ***
import { TieredMenuModule } from 'primeng/tieredmenu';
// *** PrimeNg ***

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TieredMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
