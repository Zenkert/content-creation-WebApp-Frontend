import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityFormService } from 'src/app/service/activity-form.service';
import { TopicsService } from 'src/app/service/topics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fade } from 'src/app/angular-animations/animations-fade';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss'],
  animations: [
    fade
  ]
})

export class ScienceComponent implements OnInit {
  selectedValue: string[] = [];
  ifSubmitted: boolean[] = [];
  remainingQuestions = 0
  topicGetById: any = {};
  arr: any[] = []
  count = 0;
  constructor(private category: ActivityFormService,
    private route: ActivatedRoute, private topicService: TopicsService,
    private _snackBar: MatSnackBar, private router: Router,
    private teacherAuth: TeacherAuthService) { }

  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeReload(e: BeforeUnloadEvent) {
  //   e.stopPropagation();
  //   if (this.isDataSaved()) {
  //     // return true;
  //     return (e.returnValue = 'Are you sure you want to exit?');
  //   }
  //   return true;
  // }
  // isDataSaved(): boolean {
  //   if(this.topicGetById.noOfQuestions === 0) {
  //     return false
  //   }
  //   else return true
  // }
  
  type: any = []
  topicId: any
  ngOnInit(): void {

    this.topicId = this.route.snapshot.paramMap.get('id');
    if(this.teacherAuth.currentUser.role === 'Admin') {
      this.topicService.getByTopicId(this.topicId)
      .subscribe(res => {
        this.topicGetById = res
        console.log(res.noOfQuestions)
        console.log('response', res)
        this.remainingQuestions = res.remainingQuestions
        this.arr = Array(Number(this.remainingQuestions)).fill(0)
        this.selectedValue = Array(Number(this.remainingQuestions)).fill('')
        this.ifSubmitted = Array(Number(this.remainingQuestions)).fill(false)
        console.log(this.arr)
        if (this.remainingQuestions === 0) {
          this.router.navigate([`/material/view/${res._id}`]);
          this._snackBar.open("All Questions has been submitted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          })
        }

      }, err => {
        console.log(err)
      })

    } else {
      this.topicService.getTopicByTopicId(this.topicId)
      .subscribe(res => {
        this.topicGetById = res
        console.log(res.noOfQuestions)
        console.log('response', res)
        this.remainingQuestions = res.remainingQuestions
        this.arr = Array(Number(this.remainingQuestions)).fill(0)
        this.selectedValue = Array(Number(this.remainingQuestions)).fill('')
        this.ifSubmitted = Array(Number(this.remainingQuestions)).fill(false)
        console.log(this.arr)
        if (this.remainingQuestions === 0) {
          this.router.navigate([`/material/view/${res._id}`]);
          this._snackBar.open("All Questions has been submitted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          })
        }

      }, err => {
        console.log(err)
      })
    }
    // this.topicService.getTopicByTopicId(this.topicId)
    //   .subscribe(res => {
    //     this.topicGetById = res
    //     console.log(res.noOfQuestions)
    //     console.log('response', res)
    //     // this.totalNumberOfQuestions = res.noOfQuestions - this.count
    //     this.remainingQuestions = res.remainingQuestions
    //     this.arr = Array(Number(this.remainingQuestions)).fill(0)
    //     this.selectedValue = Array(Number(this.remainingQuestions)).fill('')
    //     this.ifSubmitted = Array(Number(this.remainingQuestions)).fill(false)
    //     // this.count++
    //     console.log(this.arr)
    //     if (this.remainingQuestions === 0) {
    //       this.router.navigate([`/material/view/${res._id}`]);
    //       this._snackBar.open("All Questions has been submitted", "Ok", {
    //         duration: 5000,
    //         panelClass: ['blue-snackbar']
    //       })
    //     }

    //   }, err => {
    //     console.log(err)
    //   })

    localStorage.setItem('topicId', this.topicId);
    console.log(localStorage.getItem('topicId'))
    this.category.getQuestionType()
      .subscribe(typeData => {
        this.type = typeData
        console.log(typeData)
      })
  }
  setSubmit(value: boolean, index: number) {
    this.ifSubmitted[index] = true
    localStorage.setItem('submit', JSON.stringify(this.ifSubmitted[index]))
    let result = JSON.parse(localStorage.getItem('submit'))
  }

  // canDeactivate() {
  //   const options = {
  //     title: 'Leave page??',
  //     message: 'By leaving this page you will permanently lose your form changes.',
  //     cancelCaption: 'No',
  //     confirmCaption: 'Yes'
  //   };
  //   this.dialogueService.open(options)
  //   this.dialogueService.confirmed().subscribe(confirm => {
  //     if (confirm) {
  //       return this.router.navigate(['/home'])
  //     }
  //     else return null
  //   })
  // }

  // canDeactivate() {
  //   return confirm("Are you sure you want to leave?")
  // }
  // // @HostListener allows us to also guard against browser refresh, close, etc.
  // @HostListener('window:popstate', ['$event'])
  // onPopState($event: any) {
  //   if (!this.canDeactivate()) {
  //     $event.returnValue = "This message is displayed to the user in IE and Edge when they navigate without using Angular routing (type another URL/close the browser/etc)";
  //   }
  // }
}

