import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestRoutingPageComponent } from './routing/test-routing-page/test-routing-page.component';
import { Routing2Component } from './routing/routing2/routing2.component';
import { DynamicRoutingComponent } from './routing/dynamic-routing/dynamic-routing.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { MainComponent } from './pages/main/main.component';
import { EventComponent } from './pages/event/event.component';

const routes: Routes = [
 { path: 'routing1', component: TestRoutingPageComponent },
 { path: 'routing2', component: Routing2Component },
 { path: 'routing/:id', component: DynamicRoutingComponent },
 { path: 'login', component: LoginRegisterComponent},
 { path: 'main', component: MainComponent},
 { path: 'event', component: EventComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
