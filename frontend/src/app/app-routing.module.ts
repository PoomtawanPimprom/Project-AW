import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { EventComponent } from './pages/event/event.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { FriendComponent } from './pages/friend/friend.component';
import { EventMyeventComponent } from './pages/event-myevent/event-myevent.component';
import { EventCreateComponent } from './pages/event-create/event-create.component';
import { EventEditComponent } from './pages/event-edit/event-edit.component';
import { FriendInfoComponent } from './pages/friend-info/friend-info.component';
import { FriendRequestComponent } from './pages/friend-request/friend-request.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'friend', component: FriendComponent, canActivate: [AuthGuard] },
  { path: 'event', component: EventComponent, canActivate: [AuthGuard] },
  { path: 'event/info/:id', component: EventInfoComponent, canActivate: [AuthGuard] },
  { path: 'event/myevent', component: EventMyeventComponent, canActivate: [AuthGuard] },
  { path: 'event/myevent/create', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: 'event/myevent/edit/:id', component: EventEditComponent, canActivate: [AuthGuard] },
  { path: 'friendInfo', component: FriendInfoComponent, canActivate: [AuthGuard] },
  { path: 'friendRequest', component: FriendRequestComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //example
  { path: 'examplazyloading', loadChildren: () => import('./feature/examplelazyloading/examplelazyloading.module').then(m => m.ExamplelazyloadingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }