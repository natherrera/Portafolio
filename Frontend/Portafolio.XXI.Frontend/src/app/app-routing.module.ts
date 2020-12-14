import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Homepage1Component } from './pages/homepage1/homepage1.component';
import { Homepage2Component } from './pages/homepage2/homepage2.component';
import { Homepage3Component } from './pages/homepage3/homepage3.component';
import { Homepage4Component } from './pages/homepage4/homepage4.component';
import { BlogComponent } from './pages/blog/blog.component';
import { Blogstyle2Component } from './pages/blogstyle2/blogstyle2.component';
import { BlogdetailsComponent } from './pages/blogdetails/blogdetails.component';
import { ExdealsComponent } from './pages/exdeals/exdeals.component';
import { AboutComponent } from './pages/about/about.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { Restaurantstyle1Component } from './pages/restaurantstyle1/restaurantstyle1.component';
import { Restaurantstyle2Component } from './pages/restaurantstyle2/restaurantstyle2.component';
import { AddrestaurantComponent } from './pages/addrestaurant/addrestaurant.component';
import { ListviewComponent } from './pages/listview/listview.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { GeolocatorComponent } from './pages/geolocator/geolocator.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthorizatedGuard } from "../utils/mock-core/guards/authorizated.guard";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CancelarreservaComponent } from './pages/cancelarreserva/cancelarreserva.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: Homepage4Component,
    canActivate: [AuthorizatedGuard]
  },
  { path: 'homepage1', component: Homepage1Component },
  { path: 'homepage2', component: Homepage2Component },
  { path: 'homepage3', component: Homepage3Component },
  { path: 'homepage4', component: Homepage4Component },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-style-2', component: Blogstyle2Component },
  { path: 'blog-details', component: BlogdetailsComponent },
  { path: 'ex-deals', component: ExdealsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'restaurant-style-1', component: Restaurantstyle1Component },
  { path: 'restaurant-style-2', component: Restaurantstyle2Component },
  { path: 'add-restaurant', component: AddrestaurantComponent },
  { path: 'listview', component: ListviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orderdetails', component: OrderdetailsComponent },
  { path: 'geolocator', component: GeolocatorComponent },
  { path: 'reservas', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cancelar-reserva', component: CancelarreservaComponent },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
];

export const Routing = RouterModule.forRoot(appRoutes);
