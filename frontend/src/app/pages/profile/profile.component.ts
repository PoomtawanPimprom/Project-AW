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

  isDisabled: boolean = true;
  showDropImage: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) { 
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      institute: [{ value: '', disabled: true }],
      major: [{ value: '', disabled: true }],
      age: [{ value: '', disabled: true }],
      facebook: [{ value: '', disabled: true }],
      instagram: [{ value: '', disabled: true }],
      tiktok: [{ value: '', disabled: true }],
      image: [{ value: '', disabled: true }],
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

    if (this.isDisabled === true) {

    } else {
      const user = { 
        user:this.profileForm.value 
      }
      
      this.http.put(`http://localhost:3000/user/${_id}`,user )
        .subscribe(result => {
  
          this.fetchUserData();
        })
        this.toggleFields();
        this.profileForm.reset();
        this.showDropImage = false;
        
    }
    
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

  toggleFields() {
    this.showDropImage = !this.showDropImage;
    if (this.isDisabled) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
    this.isDisabled = !this.isDisabled;

  }
  


}
