import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatConfirmDialogueComponent } from '../user-profile/mat-confirm-dialogue/mat-confirm-dialogue.component';
import { ConfirmDialogData } from '../_models/dialogue';
import { map, take, tap } from 'rxjs/operators';
import { CanDeactivateGuard } from 'src/_validator/_auth/deactive-guard';


@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog, private activeGuard: CanDeactivateGuard) { }
  dialogRef: MatDialogRef<MatConfirmDialogueComponent>;
  public open(options: ConfirmDialogData) {
    this.dialogRef = this.dialog.open(MatConfirmDialogueComponent, {    
      width: '390px',
         data: {
           title: options.title,
           message: options.message,
           cancelCaption: options.cancelCaption,
           confirmCaption: options.confirmCaption
         }
    });  
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      tap( (res) => {
        console.log('from service')
        console.log(res)
      }),
      
      take(1), map(res => {
        return res;
      }
    ));
  }
  // @HostListener('window:popstate', ['$event'])
  // onPopState(event: any) {
  //   if (!this.activeGuard.canDeactivate(component: CanComponentDeactivate )) {
  //     event.returnValue = "This message is displayed to the user in IE and Edge when they navigate without using Angular routing (type another URL/close the browser/etc)";
  //   }
  //   console.log('Back button pressed');
  // }
}
