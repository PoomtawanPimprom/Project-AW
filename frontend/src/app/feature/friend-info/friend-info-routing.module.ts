import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendInfoComponent } from './friend-info.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [{ path: '', component: FriendInfoComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendInfoRoutingModule { }
