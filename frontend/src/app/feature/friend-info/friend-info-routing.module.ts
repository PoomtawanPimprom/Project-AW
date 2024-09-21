import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendInfoComponent } from './friend-info.component';

const routes: Routes = [{ path: '', component: FriendInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendInfoRoutingModule { }
