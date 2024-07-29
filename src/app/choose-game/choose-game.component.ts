import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameProfile } from '../../shared/model/games';
import { MatDialog } from '@angular/material/dialog';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';

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
  selectedCategory: GameProfile | null = null;

  constructor(private gamesService: GamesService, private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '250px',
      data: this.allGames,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedCategory = result;
        console.log('Selected category:', this.selectedCategory);
      }
    });
  }

  ngOnInit(): void {
    this.allGames = this.gamesService.getGames();
  }
}
