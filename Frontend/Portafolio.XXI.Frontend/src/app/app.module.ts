import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { Homepage1Component } from './pages/homepage1/homepage1.component';
import { Homepage2Component } from './pages/homepage2/homepage2.component';
import { Homepage3Component } from './pages/homepage3/homepage3.component';
import { Homepage4Component } from './pages/homepage4/homepage4.component';
import { AboutComponent } from './pages/about/about.component';
import { AddrestaurantComponent } from './pages/addrestaurant/addrestaurant.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogdetailsComponent } from './pages/blogdetails/blogdetails.component';
import { Blogstyle2Component } from './pages/blogstyle2/blogstyle2.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ExdealsComponent } from './pages/exdeals/exdeals.component';
import { GeolocatorComponent } from './pages/geolocator/geolocator.component';
import { ListviewComponent } from './pages/listview/listview.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { Restaurantstyle1Component } from './pages/restaurantstyle1/restaurantstyle1.component';
import { Restaurantstyle2Component } from './pages/restaurantstyle2/restaurantstyle2.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { Footer1Component } from './layouts/footer1/footer1.component';
import { Footer2Component } from './layouts/footer2/footer2.component';
import { AdvertisementbannerComponent } from './layouts/advertisementbanner/advertisementbanner.component';
import { BlogleftsidebarComponent } from './layouts/blogleftsidebar/blogleftsidebar.component';
import { BlogrightsidebarComponent } from './layouts/blogrightsidebar/blogrightsidebar.component';
import { RestaurantleftsidebarComponent } from './layouts/restaurantleftsidebar/restaurantleftsidebar.component';
import { RestaurantrightsidebarComponent } from './layouts/restaurantrightsidebar/restaurantrightsidebar.component';
import { Advertisementbanner1Component } from './layouts/advertisementbanner1/advertisementbanner1.component';
import { Advertisementbanner2Component } from './layouts/advertisementbanner2/advertisementbanner2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizatedGuard } from "../utils/mock-core/guards/authorizated.guard";
import { StorageService } from "../services/storage.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Homepage1Component,
    Homepage2Component,
    Homepage3Component,
    Homepage4Component,
    AboutComponent,
    AddrestaurantComponent,
    BlogComponent,
    BlogdetailsComponent,
    Blogstyle2Component,
    CheckoutComponent,
    ExdealsComponent,
    GeolocatorComponent,
    ListviewComponent,
    LoginComponent,
    OrderdetailsComponent,
    RegisterComponent,
    RestaurantComponent,
    Restaurantstyle1Component,
    Restaurantstyle2Component,
    NavbarComponent,
    Footer1Component,
    Footer2Component,
    AdvertisementbannerComponent,
    BlogleftsidebarComponent,
    BlogrightsidebarComponent,
    RestaurantleftsidebarComponent,
    RestaurantrightsidebarComponent,
    Advertisementbanner1Component,
    Advertisementbanner2Component,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    AuthorizatedGuard,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
