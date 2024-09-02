import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-check-word-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogContent],
  templateUrl: './check-word-dialog.component.html',
  styleUrl: './check-word-dialog.component.css'
})
export class CheckWordDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { isCorrect: boolean }) {}
}