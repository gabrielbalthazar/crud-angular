import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessageComponent } from '../components/alert-message/alert-message';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private snackBar = inject(MatSnackBar);

  showAlert(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.snackBar.openFromComponent(AlertMessageComponent, {
      data: message,
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    });
  }
}
