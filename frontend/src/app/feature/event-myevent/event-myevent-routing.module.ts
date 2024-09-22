import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventMyeventComponent } from './event-myevent.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [{ path: '', component: EventMyeventComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventMyeventRoutingModule { }
