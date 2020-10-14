import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderState } from './store/order/order.state';
import { OrderHistoryDialogComponent } from './components/order-history-dialog/order-history-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AsideComponent } from './components/aside/aside.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthorizatonState } from './store/authorization/authorization.state';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { SystemUserState } from './store/system-user/system-user.state';
import { ErrorState } from './store/error/error.state';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { SearchProductFormComponent } from './components/search-product-form/search-product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CardMenuComponent } from './components/card-menu/card-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    OrderFormComponent,
    OrderStatusComponent,
    OrderHistoryDialogComponent,
    OrderListComponent,
    AsideComponent,
    SearchFormComponent,
    LoginComponent,
    RegistrationFormComponent,
    SearchProductComponent,
    SearchProductFormComponent,
    ProductListComponent,
    CardMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxsModule.forRoot([
      ErrorState,
      OrderState,
      SystemUserState,
      AuthorizatonState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
