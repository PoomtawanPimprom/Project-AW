import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventInfoComponent } from './event-info.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [{ path: '', component: EventInfoComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventInfoRoutingModule { }
