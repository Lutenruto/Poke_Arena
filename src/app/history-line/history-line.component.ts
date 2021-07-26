import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history-line',
  templateUrl: './history-line.component.html',
  styleUrls: ['./history-line.component.scss']
})
export class HistoryLineComponent implements OnInit {
  @Input() attacker:string = "";
  @Input() attacked:string = "";
  @Input() attackName:string = "";
  @Input() damage:number = 0;
  @Input() isDead:boolean = false;
  constructor() {}


  ngOnInit(): void {
    
  }

}
