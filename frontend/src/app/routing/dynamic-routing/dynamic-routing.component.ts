import { Component, inject,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-routing',
  templateUrl: './dynamic-routing.component.html',
  styleUrl: './dynamic-routing.component.css'
})
export class DynamicRoutingComponent {
  private route = inject(ActivatedRoute);
  id!: string

  constructor(){}

  ngOnInit(){
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get("id")!;
    })
  }
  
}
