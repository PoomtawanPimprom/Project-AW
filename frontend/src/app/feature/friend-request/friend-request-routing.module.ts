import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendRequestComponent } from './friend-request.component';

const routes: Routes = [{ path: '', component: FriendRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRequestRoutingModule { }
