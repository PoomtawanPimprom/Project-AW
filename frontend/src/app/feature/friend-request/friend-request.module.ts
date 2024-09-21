import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendRequestRoutingModule } from './friend-request-routing.module';
import { FriendRequestComponent } from './friend-request.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FriendRequestComponent
  ],
  imports: [
    CommonModule,
    FriendRequestRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class FriendRequestModule { }
