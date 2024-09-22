import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventMyeventRoutingModule } from './event-myevent-routing.module';
import { EventMyeventComponent } from './event-myevent.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventMyeventComponent
  ],
  imports: [
    CommonModule,
    EventMyeventRoutingModule,
    SharedModule,
    FormsModule
]
})
export class EventMyeventModule { }
