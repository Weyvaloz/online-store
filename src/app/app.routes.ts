import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout/checkout.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  { path: 'checkout', component: CheckoutComponent },
];
