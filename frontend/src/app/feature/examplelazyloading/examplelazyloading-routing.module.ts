import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { ExamplelazyloadingComponent } from './examplelazyloading.component';
import { Page1Component } from './page1/page1.component';

const routes: Routes = [
  { path: '', 
    component: ExamplelazyloadingComponent,
    canActivate: [AuthGuard]     
  },
  { path: "page1",
    component: Page1Component,
    canActivate: [AuthGuard]  
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplelazyloadingRoutingModule { }
