import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventCreateRoutingModule } from './event-create-routing.module';
import { EventCreateComponent } from './event-create.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventCreateComponent
  ],
  imports: [
    CommonModule,
    EventCreateRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class EventCreateModule { }
