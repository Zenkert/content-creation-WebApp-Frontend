import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class GlobalErrorHandler implements ErrorHandler {
    constructor(private _snackBar: MatSnackBar) { }
    handleError(error: Response): void {
        // if(error.status === 500)
        this._snackBar.open("An Unexpected Error Occured.", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
        });
        throw new Error("Method not implemented." + error);
    }

}