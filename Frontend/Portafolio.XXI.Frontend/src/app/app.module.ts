import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '../environments/environment';
import {CoreModule} from "../utils/mock-core/core.module";
import { Routing } from './app-routing.module';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';


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
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DialogContentMesaComponent } from './pages/dashboard/modalVistas/DialogContentMesa/dialogContentMesa.component';
import { DialogContentCocinaComponent } from './pages/dashboard/modalVistas/DialogContentCocina/dialogContentCocina.component';
import { DialogContentPagoComponent } from './pages/dashboard/modalVistas/DialogContentPago/dialogContentPago.component';
import { VistamesasComponent } from './pages/dashboard/tablaVistas/vistaMesas/vistaMesas.component';
import { VistacocinaComponent } from './pages/dashboard/tablaVistas/vistaCocina/vistaCocina.component';
import { VistapagoComponent } from './pages/dashboard/tablaVistas/vistaPago/vistaPago.component';
import { VistapedidoComponent } from './pages/dashboard/tablaVistas/vistaPedido/vistaPedido.component';
import { DialogModificarComponent } from './pages/dashboard/modalVistas/DialogPedido/modificar/dialogModificar.component';
import { DialogVerComponent } from './pages/dashboard/modalVistas/DialogPedido/ver/dialogVer.component';
import { VistaproductoComponent } from './pages/dashboard/tablaVistas/vistaProducto/vistaproducto.component';
import { VistapersonalComponent } from './pages/dashboard/tablaVistas/vistaPersonal/vistapersonal.component';
import { VistainsumosComponent } from './pages/dashboard/tablaVistas/vistaInsumos/vistainsumos.component';
import { VistareservasComponent } from './pages/dashboard/tablaVistas/vistaReservas/vistareservas.component';
import { DialogContentProductoComponent } from './pages/dashboard/modalVistas/DialogContentProducto/dialogContentProducto.component';

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
    ContactComponent,
    DashboardComponent,
    DialogContentMesaComponent,
    DialogContentCocinaComponent,
    DialogContentPagoComponent,
    DialogModificarComponent,
    DialogVerComponent,
    DialogContentProductoComponent,
    VistamesasComponent,
    VistacocinaComponent,
    VistapagoComponent,
    VistapedidoComponent,
    VistaproductoComponent,
    VistapersonalComponent,
    VistainsumosComponent,
    VistareservasComponent,
  ],
  imports: [
BrowserModule,
    Routing,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatCardModule
  ],
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
