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
    path: 'list',
    component: OrderListComponent,
    resolve: [OrderListResolver],
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'search',
    component: SearchProductComponent,
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
    OrderListResolver,
    AuthorizationGuard
  ]
})
export class AppRoutingModule { }
