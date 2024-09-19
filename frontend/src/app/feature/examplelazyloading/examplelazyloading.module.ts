import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplelazyloadingRoutingModule } from './examplelazyloading-routing.module';
import { ExamplelazyloadingComponent } from './examplelazyloading.component';
import { Page1Component } from './page1/page1.component';


@NgModule({
  declarations: [
    ExamplelazyloadingComponent,
    Page1Component
  ],
  imports: [
    CommonModule,
    ExamplelazyloadingRoutingModule
  ]
})
export class ExamplelazyloadingModule { }
