import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  selectedMenu: string = 'เพื่อนทั้งหมด';

  @Output() filterInstitute = new EventEmitter<string>();

  onFilterInstitute(faculty: string): void {
    this.selectedMenu = faculty; // เก็บเมนูที่ถูกเลือก
    this.filterInstitute.emit(faculty); // ส่งค่า faculty เป็น string
  }

  isActiveMenu(faculty: string): boolean {
    return this.selectedMenu === faculty;
  }
}
