import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  imageSrc:String = '';

  @Input() game!: Game;


  constructor() { }

  ngOnInit(): void {



    switch(this.game.name){
      case "THE_DEN": this.imageSrc = '../../../../assets/the-den.jpg'; break;
      case "HAUNTED_HOUSE" : this.imageSrc = '../../../../assets/haunted-house.jpg'; break;
      default : this.imageSrc = '../../../../assets/image.jpg'
    }
  }

}
