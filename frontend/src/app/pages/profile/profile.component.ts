import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { userInterface } from '../../interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { handleFileChange } from '../../customs/imageUtils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  id!: string;
  user: userInterface[] = [];
  profileForm: FormGroup;
  imageBase64!: string;

  selectUserId!: string;

  constructor(private http: HttpClient, private fb: FormBuilder) { 
    this.profileForm = this.fb.group({
      username: [''],
      name: [''],
      email: [''],
      institute: [''],
      major: [''],
      age: [''],
      facebook: [''],
      instagram: [''],
      tiktok: [''],
      image: [''],
    });
   }

  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id")!;
    })
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<userInterface[]>(`http://localhost:3000/user/${this.id}`)
      .subscribe(result => {
        this.user = result;
        console.log(result);
        this.profileForm.patchValue({
          username: this.user[0].username,
          name: this.user[0].name,
          email: this.user[0].email,
          institute: this.user[0].institute,
          major: this.user[0].major,
          age: this.user[0].age,
          facebook: this.user[0].facebook,
          instagram: this.user[0].instagram,
          tiktok: this.user[0].tiktok,
          image: this.user[0].image
        });
        // console.log(this.profileForm);
      }
    )
  }


  updateUser(_id: string) {
    const user = { 
      user:this.profileForm.value 
    }
    
    this.http.put(`http://localhost:3000/user/${_id}`,user )
      .subscribe(result => {
        // console.log(result)
        this.fetchUserData();
      })
      this.profileForm.reset();
  }

  async onClickUpdateUser(_id:string) {
    console.log("_id",_id)
    this.updateUser(_id);
  }

  onFileChange(event: any): void {
    handleFileChange(event, (base64: string) => {
      this.imageBase64 = base64;
      this.profileForm.patchValue({
        image: this.imageBase64
      });
      console.log(this.imageBase64);
    });
  }

}
