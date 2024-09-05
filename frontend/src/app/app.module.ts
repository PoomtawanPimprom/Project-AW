import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavMainComponent } from './components/nav-main/nav-main.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { TestRoutingPageComponent } from './routing/test-routing-page/test-routing-page.component';
import { Routing2Component } from './routing/routing2/routing2.component';
import { DynamicRoutingComponent } from './routing/dynamic-routing/dynamic-routing.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavMainComponent,
    LoginRegisterComponent,
    TestRoutingPageComponent,
    Routing2Component,
    DynamicRoutingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
