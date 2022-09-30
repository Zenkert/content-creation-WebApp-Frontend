// import { HostListener, Injectable } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { CanDeactivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
// import { MatConfirmDialogueComponent } from 'src/app/user-profile/mat-confirm-dialogue/mat-confirm-dialogue.component';
// import { map, take } from 'rxjs/operators';

// export interface CanComponentDeactivate {
//   canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//   constructor(private dialogueService: ConfirmDialogService, private router: Router) { }
//   dialogRef: MatDialogRef<MatConfirmDialogueComponent>;

//   canDeactivate(component: CanComponentDeactivate) {
//     // return component.canDeactivate ? component.canDeactivate() : true;
//     return component.canDeactivate() ? true :
//       this.openConfirmDialog();
//   }

//   openConfirmDialog() {
//     return confirm('Hey you sure?')
//     // this.modalRef = this.modalService.show(ConfirmationComponent);
//     // return this.modalRef.content.onClose.map(result => {
//     //   return result;
//     // })
//   }

//   // openConfirmDialog() {
//   //   const options = {
//   //     title: 'Leave page??',
//   //     message: 'By leaving this page you will permanently lose your form changes.',
//   //     cancelCaption: 'No',
//   //     confirmCaption: 'Yes'
//   //   };
//   //   this.dialogueService.open(options)
//   //   this.dialogueService.confirmed().subscribe(confirm => {
//   //     if (confirm) {
//   //       this.router.navigate(['/home'])
//   //     }
//   //     else return
//   //   })
//   // }

// }


import { MatConfirmDialogueComponent } from 'src/app/user-profile/mat-confirm-dialogue/mat-confirm-dialogue.component';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SafeData } from '../../app/_models/save-data-interface'
@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<SafeData> {
  constructor(private dialog: MatDialog) { }
  canDeactivate(
    component: SafeData
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.isDataSaved()) {
    
      const dialogRef = this.dialog.open(MatConfirmDialogueComponent, {
        width: '390px',
        data: {
          title: 'Leave page?',
          message: 'By leaving this page you will permanently lose your form changes.',
          cancelCaption: 'No',
          confirmCaption: 'Yes'
        }
      });
      return dialogRef.afterClosed();
    }
    return of(true);
  }
  
}