import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor(protected readonly snackBar: MatSnackBar,) { }

  sucess(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 50000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['msg-success'],
    });
  }

  error(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 50000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass:  ['msg-error'],
    });
  }
}
