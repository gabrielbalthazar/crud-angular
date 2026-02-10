import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-message',
  standalone: false,
  templateUrl: './alert-message.html',
  styleUrl: './alert-message.scss',
})
export class AlertMessageComponent {
  private snackBarRef = inject(MatSnackBarRef);

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) { }

  closedAlert() {
    this.snackBarRef.dismiss();
  }
}
