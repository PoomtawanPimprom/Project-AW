import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './event-create.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [{ path: '', component: EventCreateComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventCreateRoutingModule { }
