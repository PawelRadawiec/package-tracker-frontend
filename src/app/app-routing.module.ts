import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OrderResolver } from './resolvers/order.rsolver';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'order',
    component: OrderFormComponent
  },
  {
    path: 'status/:id/:code',
    component: OrderStatusComponent,
    resolve: {
      orderResolver: OrderResolver
    }
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [OrderResolver]
})
export class AppRoutingModule { }
