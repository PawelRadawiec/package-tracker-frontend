import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OrderResolver } from './resolvers/order.rsolver';
import { BulletResolver } from './resolvers/bullet.resolver';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderListResolver } from './resolvers/order-list.resolver';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full'
  },
  {
    path: 'order',
    component: OrderFormComponent
  },
  {
    path: 'status/:id/:code',
    component: OrderStatusComponent,
    resolve: [OrderResolver, BulletResolver]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'list',
    component: OrderListComponent,
    resolve: [OrderListResolver]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    OrderResolver,
    BulletResolver,
    OrderListResolver
  ]
})
export class AppRoutingModule { }
