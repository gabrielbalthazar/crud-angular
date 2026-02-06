import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PipesPipe } from './pipes/pipes-pipe';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    PipesPipe,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports:[

  ],
})
export class SharedModule { }
