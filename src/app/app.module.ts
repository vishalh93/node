import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router"
import {FormsModule} from "@angular/forms"
import {HttpModule} from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {ColorPickerModule} from "ngx-color-picker";


import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubsubCategoryComponent } from './subsub-category/subsub-category.component';
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';


var normal_obb = [
  {path:"cat" , component:CategoryComponent},
  {path:"subcategory", component:SubcategoryComponent},
  {path:"subsubcat" ,component:SubsubCategoryComponent},
  {path:"brand" , component:BrandComponent},
  {path:"product" , component:ProductComponent}
]
var rout_obb = RouterModule.forRoot(normal_obb)

@NgModule({
  declarations: [AppComponent, CategoryComponent, SubsubCategoryComponent, BrandComponent, ProductComponent, SubcategoryComponent],
  imports: [FormsModule,BrowserModule,RouterModule,HttpModule,Ng2SearchPipeModule,OrderModule,NgxPaginationModule,rout_obb,ColorPickerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
