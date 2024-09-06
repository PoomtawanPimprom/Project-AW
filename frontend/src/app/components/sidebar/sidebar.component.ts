import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  institute!: string;

  constructor() {}

  ngOnInit(): void {
  }

  onFilterInstitute(receiver: string): void {
    this.institute = receiver;
    console.log("Filter: ", this.institute)
  }

}
