import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OrderResolver } from './resolvers/order.rsolver';
import { BulletResolver } from './resolvers/bullet.resolver';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { LoginComponent } from './components/login/login.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { CardMenuComponent } from './components/card-menu/card-menu.component';
import { ProductsResolver } from './resolvers/products.resolver';
import { BasketCountResolver } from './resolvers/basket-count.resolver';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'order',
    component: OrderFormComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'registration',
    component: RegistrationFormComponent
  },
  {
    path: 'status/:id/:code',
    component: OrderStatusComponent,
    resolve: [OrderResolver, BulletResolver],
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'menu',
    component: CardMenuComponent,
    resolve: [OrderListResolver],
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'orders',
    component: OrderListComponent,
    resolve: [OrderListResolver],
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'products/search',
    component: SearchProductComponent,
    resolve: [ProductsResolver, BasketCountResolver],
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    OrderResolver,
    BulletResolver,
    ProductsResolver,
    OrderListResolver,
    BasketCountResolver,
    AuthorizationGuard
  ]
})
export class AppRoutingModule { }
