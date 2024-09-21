import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { InputCommentComponent } from '../components/comment/input-comment/input-comment.component';
import { ShowCommentComponent } from '../components/comment/show-comment/show-comment.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    InputCommentComponent,
    ShowCommentComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    InputCommentComponent,
    ShowCommentComponent
  ]
})
export class SharedModule { }
