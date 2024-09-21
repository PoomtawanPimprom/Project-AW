import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendRoutingModule } from './friend-routing.module';
import { FriendComponent } from './friend.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FriendComponent
  ],
  imports: [
    CommonModule,
    FriendRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class FriendModule { }
