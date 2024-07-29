import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameProfile } from '../../shared/model/games';
import { MatDialog } from '@angular/material/dialog';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-game.component.html',
  styleUrls: ['./choose-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {
  
  allGames: GameProfile[] = [];
  selectedGame: GameProfile | null = null;
  categoryId: number = 0
  //electedCategory: Category = null

  constructor(
    private gamesService: GamesService, 
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    ) {}
  
  
  

  openDialog(): void {
    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '250px',
      data: this.selectedGame,
    });

    
  }

  ngOnInit(): void {
    this.allGames = this.gamesService.getGames();
  }


  
}
