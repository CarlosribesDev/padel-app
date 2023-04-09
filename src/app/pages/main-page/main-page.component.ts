import { GameService } from './../../service/game.service';
import { Component, OnInit } from '@angular/core';
import { Game } from 'app/models/Game';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  games!: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    // this.gameService.getAll().subscribe({
    //   next:(games: Game[])=>{
    //       this.games = games;
    //   }
    // })
  }

}
