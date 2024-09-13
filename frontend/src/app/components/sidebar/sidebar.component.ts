import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  selectedMenu: string = 'เพื่อนทั้งหมด';

  @Output() filterInstitute = new EventEmitter<string>();

  // SidebarComponent
onFilterInstitute(institute: string): void {
  this.selectedMenu = institute; // เก็บเมนูที่ถูกเลือก
  this.filterInstitute.emit(institute); // ส่งค่า institute เป็น string
  console.log(`Emitting institute: ${institute}`);
}

  

  isActiveMenu(institute: string): boolean {
    return this.selectedMenu === institute;
  }
}
