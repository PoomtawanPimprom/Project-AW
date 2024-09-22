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
  //{ path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  // { path: 'friend', component: FriendComponent, canActivate: [AuthGuard] },
  // { path: 'event', component: EventComponent, canActivate: [AuthGuard] },
  // { path: 'event/info/:id', component: EventInfoComponent, canActivate: [AuthGuard] },
  // { path: 'event/myevent', component: EventMyeventComponent, canActivate: [AuthGuard] },
  // { path: 'event/myevent/create', component: EventCreateComponent, canActivate: [AuthGuard] },
  // { path: 'event/myevent/edit/:id', component: EventEditComponent, canActivate: [AuthGuard] },
  // { path: 'friendInfo', component: FriendInfoComponent, canActivate: [AuthGuard] },
  // { path: 'friendRequest', component: FriendRequestComponent, canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  //example
  { path: 'examplazyloading', loadChildren: () => import('./feature/examplelazyloading/examplelazyloading.module').then(m => m.ExamplelazyloadingModule)},
  { path: 'profile', loadChildren: () => import('./feature/profile/profile.module').then(m => m.ProfileModule) },

  { path: 'login', loadChildren: () => import('./feature/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./feature/register/register.module').then(m => m.RegisterModule) },
  { path: 'main', loadChildren: () => import('./feature/main/main.module').then(m => m.MainModule) },
  { path: 'friend', loadChildren: () => import('./feature/friend/friend.module').then(m => m.FriendModule), },
  { path: 'friendInfo', loadChildren: () => import('./feature/friend-info/friend-info.module').then(m => m.FriendInfoModule) },
  { path: 'friendRequest', loadChildren: () => import('./feature/friend-request/friend-request.module').then(m => m.FriendRequestModule) },
  { path: 'event', loadChildren: () => import('./feature/event/event.module').then(m => m.EventModule) },
  { path: 'event/myevent/create', loadChildren: () => import('./feature/event-create/event-create.module').then(m => m.EventCreateModule) },
  { path: 'event/myevent/edit/:id', loadChildren: () => import('./feature/event-edit/event-edit.module').then(m => m.EventEditModule) },
  { path: 'event/info/:id', loadChildren: () => import('./feature/event-info/event-info.module').then(m => m.EventInfoModule) },
  { path: 'event/myevent', loadChildren: () => import('./feature/event-myevent/event-myevent.module').then(m => m.EventMyeventModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }