import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { CartComponent } from './cart/cart.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TabsComponent } from './tabs/tabs.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { SearchComponent } from './search/search.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    CartComponent,
    TabsComponent,
    PaginationComponent,
    CarouselComponent,
    SearchComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    CartComponent,
    TabsComponent,
    PaginationComponent,
    CarouselComponent,
    SearchComponent,
    ProductsComponent
  ],
})
export class SharedModule {}
