import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  @Input() msg: string;
  legenda: string = 'estou no angular';

  constructor() { }

  ngOnInit(): void {
  }

  resetLegenda(): void {
    console.log('Evento click Reset Legenda!');
  }
}
