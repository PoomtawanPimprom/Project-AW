import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { TestRoutingPageComponent } from './routing/test-routing-page/test-routing-page.component';
import { Routing2Component } from './routing/routing2/routing2.component';
import { DynamicRoutingComponent } from './routing/dynamic-routing/dynamic-routing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './pages/main/main.component';
import { EventComponent } from './pages/event/event.component';
import { FriendComponent } from './pages/friend/friend.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LoginRegisterComponent,
    TestRoutingPageComponent,
    Routing2Component,
    DynamicRoutingComponent,
    MainComponent,
    EventComponent,
    FriendComponent,
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
