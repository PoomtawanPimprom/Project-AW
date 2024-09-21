import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendInfoRoutingModule } from './friend-info-routing.module';
import { FriendInfoComponent } from './friend-info.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FriendInfoComponent
  ],
  imports: [
    CommonModule,
    FriendInfoRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class FriendInfoModule { }
