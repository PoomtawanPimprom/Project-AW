import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { userInterface } from '../../interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  username!: string;
  user: userInterface[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      this.username = params.get("username")!;
    })
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<userInterface[]>(`http://localhost:3000/user/${this.username}`)
      .subscribe(result => {
        this.user = result;
        console.log(result)
      }
    )
  }
  
  get image() {
    return this.user.length > 0 ? this.user[0].image : 'default-image-url.jpg';
  }
  

}
