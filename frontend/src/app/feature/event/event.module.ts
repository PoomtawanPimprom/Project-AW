import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    FormsModule
]
})
export class EventModule { }
