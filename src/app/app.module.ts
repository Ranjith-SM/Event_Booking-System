import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {

//   MatIconModule, MatInputModule,
//   MatAutocompleteModule, MatChipsModule,
//   MatFormFieldModule


// } from '@angular/material';


import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { TestComponent } from './component/test/test.component';
import { EventsComponent } from './component/events/events.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventBookedComponent } from './component/event-booked/event-booked.component';
import { AdmincategoryComponent } from './component/admin/admincategory/admincategory.component';
import { AdmineventComponent } from './component/admin/adminevent/adminevent.component';
import { ViewusersComponent } from './component/admin/viewusers/viewusers.component';
import { NgChartsModule  } from 'ng2-charts';
import { ViewBookedEventsComponent } from './component/admin/view-booked-events/view-booked-events.component';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipePipe } from './model/filter-pipe.pipe';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    TestComponent,
    EventsComponent,
    EventBookedComponent,
    AdmincategoryComponent,
    AdmineventComponent,
    ViewusersComponent,
    ViewBookedEventsComponent,
    FilterPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule,
    NgChartsModule,
    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
