import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PagePanierComponent } from './pages/page-panier/page-panier.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { FilterSideBarComponent } from './components/filter-side-bar/filter-side-bar.component';
import { CardPlantComponent } from './components/card-plant/card-plant/card-plant.component';
import { IconComponent } from './components/icon/icon.component';
import { AvisBarComponent } from './components/avis-bar/avis-bar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { PipePipe } from './pipe.pipe';
import { BtnFilterComponent } from './components/btn-filter/btn-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PageAccueilComponent,
    PageDetailsComponent,
    PagePanierComponent,
    PageNotFoundComponent,
    FilterSideBarComponent,
    CardPlantComponent,
    IconComponent,
    AvisBarComponent,
    SearchbarComponent,
    PipePipe,
    BtnFilterComponent,
    PageProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSliderModule
  ],
  providers: [PipePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
