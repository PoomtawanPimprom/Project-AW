import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMyeventComponent } from './event-myevent.component';

describe('EventMyeventComponent', () => {
  let component: EventMyeventComponent;
  let fixture: ComponentFixture<EventMyeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventMyeventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMyeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
