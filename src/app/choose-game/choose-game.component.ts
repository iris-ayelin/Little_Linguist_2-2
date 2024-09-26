import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameProfile } from '../../shared/model/games';
import { MatDialog } from '@angular/material/dialog';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './choose-game.component.html',
  styleUrls: ['./choose-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {
  allGames: GameProfile[] = [];
  selectedGame!: GameProfile;
  categoryId: string = '';
  categories: Category[] = [];


  constructor(
    private gamesService: GamesService,
    private dialog: MatDialog,
    private categoriesService: CategoriesService, 
  ) {}

  openDialog(game: GameProfile): void {
    this.selectedGame = game;

    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '250px',
      data: {
        gameId: game.gameId,
        game: this.selectedGame, 
        gameUrl: game.gameUrl,
        categoryId: this.categoryId,
      },     
    });
  }

  async ngOnInit(): Promise<void> {
    this.allGames = this.gamesService.getGames();
    this.categories = await this.categoriesService.list();
    if (this.categories.length > 0) {
      this.categoryId = this.categories[0].id;
    }
  }
}
