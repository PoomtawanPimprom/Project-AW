import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendInfoComponent } from './friend-info.component';

describe('FriendInfoComponent', () => {
  let component: FriendInfoComponent;
  let fixture: ComponentFixture<FriendInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
