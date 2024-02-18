import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatDialogModule
  ],
  exports: [
    MatDividerModule,
    MatDialogModule
  ]
})

export class MaterialModule { }