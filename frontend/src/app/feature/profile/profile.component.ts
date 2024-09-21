import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userInterface } from '../../interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { handleFileChange } from '../../customs/imageUtils';
import { ProfileService } from '../../service/profile/profile.service';
import { CustomValidators } from '../../customs/customValidators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  id!: string;
  user!: userInterface;
  profileForm: FormGroup;
  imageBase64!: string;
  selectUserId!: string;

  isDisabled: boolean = true;
  showDropImage: boolean = false;
  obj_id!: string;

  constructor(private http: HttpClient, private fb: FormBuilder, private eventService: ProfileService) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }, [Validators.required, CustomValidators.forbiddenWords(['กู', 'มึง', 'สัส', 'ควย', 'ไอ้', 'เลว', 'cpe', 'C PE']), CustomValidators.maxLength(10)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      institute: [{ value: '', disabled: true }],
      major: [{ value: '', disabled: true }],
      age: [{ value: '', disabled: true }, [ Validators.min(3), Validators.max(100), Validators.pattern('^\\d+$')]],
      interest: [{ value: '', disabled: true }],
      facebook: [{ value: '', disabled: true }],
      instagram: [{ value: '', disabled: true }],
      tiktok: [{ value: '', disabled: true }],
      image: [{ value: '', disabled: true }],
    });
   }

  ngOnInit(){
    this.obj_id = localStorage.getItem('_id') || '';
    this.fetchUserData();

  }

  get email() {
    return this.profileForm.get('email');
  }

  get name() {
    return this.profileForm.get('name');
  }

  get age() {
    return this.profileForm.get('age');
  }

  fetchUserData() {
    this.eventService.getUserByObjectId(this.obj_id)
      .subscribe(result => {
        this.user = result;
        console.log(result);
        this.profileForm.patchValue({
          username: this.user.username,
          name: this.user.name,
          email: this.user.email,
          institute: this.user.institute,
          major: this.user.major,
          age: this.user.age,
          interest: this.user.interest,
          facebook: this.user.facebook,
          instagram: this.user.instagram,
          tiktok: this.user.tiktok,
          image: this.user.image
        });
      }
    )
  }

  updateUser(_id: string) {
    if (this.isDisabled === true) {
    } else {
      const user = { 
        user:this.profileForm.value 
      }
      this.eventService.updateUserByObjectId(_id, user)
        .subscribe(result => {
          this.fetchUserData();
        })
        this.toggleFields();
        this.profileForm.reset();
        this.showDropImage = false;
    }
  }

  async onClickUpdateUser(_id:string) {
    // console.log("_id",_id)
    this.updateUser(_id);
  }

  onFileChange(event: any): void {
    handleFileChange(event, (base64: string) => {
      this.imageBase64 = base64;
      this.profileForm.patchValue({
        image: this.imageBase64
      });
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
