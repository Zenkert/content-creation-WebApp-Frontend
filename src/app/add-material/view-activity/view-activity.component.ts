import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { DataService } from 'src/app/service/curd-data-service';
import { environment } from 'src/environments/environment';
import { TopicsService } from 'src/app/service/topics.service';
import { TeacherAuthService } from '../../service/teacher-auth.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({
        opacity: 0,
        backgroundColor: '#ccdceb'
      })),
      transition('void => *', [
        animate(2000)
      ]),
      transition('* => void', [
        animate(2000)
      ])
    ])
  ]
})
export class ViewActivityComponent implements OnInit {
  topic: any;
  topicGetById: Array<any> = []
  processSort: any
  userId = localStorage.getItem('id');
  remainingQuestions: any
  typeNameArray: any

  constructor(private route: ActivatedRoute, private topicService: TopicsService, private router: Router,
    private dialogueService: ConfirmDialogService,  public teacherAuth: TeacherAuthService,
    private _snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit(): void {
    this.topic = this.route.snapshot.paramMap.get('id')
    this.topicService.getAllTopicData(this.topic)
      .subscribe(
        response => {
          this.topicGetById = <any>response
          this.topicGetById[0]["combineQuestion"] = this.topicGetById[0].allQuestions
            .sort((low: { sequence: number; }, high: { sequence: number; }) => {
              return low.sequence - high.sequence;
            })
          // let i;
          // for( i = 1; i <= this.topicGetById[0].combineQuestion.length; i++) {
          //   this.topicGetById[0].combineQuestion[i-1].sequence = i
          // }
          console.log('response', this.topicGetById[0])
          this.remainingQuestions = this.topicGetById[0]?.remainingQuestions
          console.log(this.remainingQuestions, "total number")
        }, err => {
          console.log(err)
        })
  }

  openDeleteDialogue(id: any, typeName: any): void {
    const options = {
      title: 'Delete Question?',
      message: 'Are you sure you want to delete this Question?',
      cancelCaption: 'No',
      confirmCaption: 'Yes'
    };
    this.dialogueService.open(options)
    this.dialogueService.confirmed().subscribe(confirm => {
      if (confirm) {
        let path = ''
        if (typeName === 'openEnded') {
          path = 'openEnded'
        }
        else if (typeName === 'introduction') {
          path = 'intro'
        }
        else if (typeName === 'mcqs') {
          path = 'mcqs'
        }
        else if (typeName === 'matchPairs') {
          path = 'match'
        }
        else if (typeName === 'trueFalse') {
          path = 'true_false'
        }
        this.dataService.setUrl(`${environment.web_URL}/api/${path}`)
        this.dataService.delete(id).subscribe(
          res => {
            this.ngOnInit();
            this._snackBar.open(" Your Question has been Deleted", "Ok", {
              duration: 5000,
              panelClass: ['blue-snackbar']
            });
            window.location.reload()
          }, err => {
            console.log(err)
            this._snackBar.open(" Your Question has not been Deleted", "Ok", {
              duration: 5000,
              panelClass: ['red-snackbar']
            });
          }
        )
      }
      else return
    })
  }

  deleteTopicDialogue(id: any): void {
    const options = {
      title: 'Delete Topic?',
      message: 'Are you sure you want to delete this Topic?',
      cancelCaption: 'No',
      confirmCaption: 'Yes'
    };
    this.dialogueService.open(options)
    this.dialogueService.confirmed().subscribe(confirm => {
      if (confirm) {
        this.deleteTopic(id)
      }
      else return
    })
  }

  deleteTopic(id: any) {
    this.topicService.deleteTopic(id).subscribe(
      res => {
        this._snackBar.open(" Your Topic has been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/user/view']);
      }, err => {
        console.log(err)
        this._snackBar.open(" Your Topic has not been Deleted", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    )
  }
}
