import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/_models/dialogue';

@Component({
  selector: 'app-mat-confirm-dialogue',
  templateUrl: './mat-confirm-dialogue.component.html',
  styleUrls: ['./mat-confirm-dialogue.component.scss']
})
export class MatConfirmDialogueComponent implements OnInit {
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private mdDialogRef: MatDialogRef<MatConfirmDialogueComponent>) { }

  ngOnInit(): void {
  }

  public cancel() {
    this.close(false);
  }
  public close(value: boolean) {
    this.mdDialogRef.close(value);
  }
  public confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc") 
  public onEsc() {
    this.close(false);
  }
}
