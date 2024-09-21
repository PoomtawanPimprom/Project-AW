import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventInfoRoutingModule } from './event-info-routing.module';
import { EventInfoComponent } from './event-info.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    EventInfoComponent
  ],
  imports: [
    CommonModule,
    EventInfoRoutingModule,
    SharedModule
]
})
export class EventInfoModule { }
