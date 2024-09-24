import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendRequestComponent } from './friend-request.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [{ path: '', component: FriendRequestComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRequestRoutingModule { }
