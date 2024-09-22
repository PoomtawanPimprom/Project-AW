import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventEditRoutingModule } from './event-edit-routing.module';
import { EventEditComponent } from './event-edit.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventEditComponent
  ],
  imports: [
    CommonModule,
    EventEditRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class EventEditModule { }
