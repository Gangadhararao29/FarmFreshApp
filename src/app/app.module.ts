import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';

import { HomeComponent } from './home/home.component';

import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { MainnavComponent } from './home/mainnav/mainnav.component';
import { UsernavComponent } from './user/usernav/usernav.component';
import { CartComponent } from './user/cart/cart.component';
import { AdminnavComponent } from './admin/adminnav/adminnav.component';
import { EditproductComponent } from './admin/editproduct/editproduct.component';
import { UpdatepricesComponent } from './admin/updateprices/updateprices.component';
import { ProductdetailsComponent } from './products/productdetails/productdetails.component';
import { EditdetailsComponent } from './admin/editdetails/editdetails.component';
import { AuthorisationService } from 'services/authorisation.service';
import { ToastrModule } from 'ngx-toastr';

import { SearchFilterPipe } from './search/search-filter.pipe';
import { UserprofileComponent } from './user/userprofile/userprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddproductComponent,
    AboutComponent,
    HeaderComponent,
    CarouselComponent,
    ProductsComponent,
    SearchComponent,
    FooterComponent,
    UserComponent,
    AdminComponent,
    MainnavComponent,
    UsernavComponent,
    CartComponent,
    AdminnavComponent,
    EditproductComponent,
    UpdatepricesComponent,
    ProductdetailsComponent,
    EditdetailsComponent,
    SearchFilterPipe,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthorisationService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
