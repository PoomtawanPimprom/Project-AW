import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { InputCommentComponent } from '../components/comment/input-comment/input-comment.component';
import { ShowCommentComponent } from '../components/comment/show-comment/show-comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    InputCommentComponent,
    ShowCommentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
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
