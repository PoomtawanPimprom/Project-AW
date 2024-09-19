
# คู่มือการทำ lazy loading module in Angular

lazy loading module in Angular คือ ปกติเวลาเราใช้คำสั่ง ng serve มันจะทำการโหลด  
ไฟล์ มันจะโหลดมาทั้งหมด ส่งผลให้เกิดความช้า ถ้าในกรณีที่ Project มีขนาดใหญ่มาก ดังนั้น  
การมี lazy loading มาช่วยในการโหลด file มาแค่ที่ต้องการเช่น User ไปที่ page Profile   
มันก็โหลดมาแค่ component page Profile แค่นั้น

step by step
---
1.ทำการสร้าง module แยก  
มันจะทำการคล้ายๆ app ซ้อน app อีกที  
ก็จะมีไฟล์ 
routing
css
html
ts 2 file
module 
```
ng generate module <<name>> --route <<name>> --module app.module
```

2.สร้าง component or page
--- 
```
ng g c <<name>>
```

3.Routing
ต้องทำ 2 ที่ คือในตัว .routing ของตัวที่เราสร้าง แล้วที่ .routing อันใหญ่  
(โดยอันใหญ่มันจะ auto ให้แล้วแต่ถ้า .routing ข้างใน เราต้องกำหนดเอง)  
***อย่าลืม ใส่ canActivate: [AuthGuard] นะใน .routing ที่สร้าง 