import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { EventsComponent } from './component/events/events.component';
import { EventBookedComponent } from './component/event-booked/event-booked.component';
import { AdmincategoryComponent } from './component/admin/admincategory/admincategory.component';
import { AdmineventComponent } from './component/admin/adminevent/adminevent.component';
import { ViewBookedEventsComponent } from './component/admin/view-booked-events/view-booked-events.component';
import { ViewusersComponent } from './component/admin/viewusers/viewusers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard]},
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard]},
  { path: 'event', component:EventsComponent },
  { path: 'booked', component:EventBookedComponent },
  { path: 'adminCategory', component:AdmincategoryComponent},
  { path: 'adminEvent', component:AdmineventComponent },
  { path: 'bookedEvent', component:ViewBookedEventsComponent},
  { path: 'users', component:ViewusersComponent}
];

// for admin and home component have to add auth guard
// canActivate: [authGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
