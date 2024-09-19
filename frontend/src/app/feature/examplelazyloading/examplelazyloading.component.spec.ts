import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplelazyloadingComponent } from './examplelazyloading.component';

describe('ExamplelazyloadingComponent', () => {
  let component: ExamplelazyloadingComponent;
  let fixture: ComponentFixture<ExamplelazyloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamplelazyloadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamplelazyloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
