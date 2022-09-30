import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { ActivityFormService } from 'src/app/service/activity-form.service';
import { TopicsService } from 'src/app/service/topics.service';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {

  constructor(private topicService: TopicsService,
    private snackbar: MatSnackBar, private route: ActivatedRoute,
    private activityService: ActivityFormService,
    private router: Router, public teacherAuth: TeacherAuthService) {
    this.topicId = this.route.snapshot.paramMap.get('topicId');

    if(this.teacherAuth.currentUser?.role === 'Admin') {
      this.topicService.getByTopicId(this.topicId).subscribe(
        res => {
          this.updateTopic = res;
          this.remainingQuestion = this.updateTopic.remainingQuestions
          this.length = this.updateTopic.noOfQuestions
          this.topicForm.patchValue({
            topic: this.updateTopic.topic,
            ageGroup: this.updateTopic.ageGroup,
            language: this.updateTopic.language,
            country: this.updateTopic.country,
            grade: this.updateTopic.grade,
            noOfQuestions: this.updateTopic.noOfQuestions,
            remainingQuestions: this.remainingQuestion,
            time: this.updateTopic.time,
            subject: this.updateTopic.subject,
            access: this.updateTopic.access,
            accessCode: this.updateTopic.accessCode
          })
        });
    } else {
      this.topicService.getTopicByTopicId(this.topicId).subscribe(
        res => {
          this.updateTopic = res;
          this.remainingQuestion = this.updateTopic.remainingQuestions
          this.length = this.updateTopic.noOfQuestions
          this.topicForm.patchValue({
            topic: this.updateTopic.topic,
            ageGroup: this.updateTopic.ageGroup,
            language: this.updateTopic.language,
            country: this.updateTopic.country,
            grade: this.updateTopic.grade,
            noOfQuestions: this.updateTopic.noOfQuestions,
            remainingQuestions: this.remainingQuestion,
            time: this.updateTopic.time,
            subject: this.updateTopic.subject,
            access: this.updateTopic.access,
            accessCode: this.updateTopic.accessCode
          })
        });
    }
    // this.topicService.getTopicByTopicId(this.topicId).subscribe(
    //   res => {
    //     this.updateTopic = res;
    //     this.remainingQuestion = this.updateTopic.remainingQuestions
    //     this.length = this.updateTopic.noOfQuestions
    //     this.topicForm.patchValue({
    //       topic: this.updateTopic.topic,
    //       ageGroup: this.updateTopic.ageGroup,
    //       language: this.updateTopic.language,
    //       country: this.updateTopic.country,
    //       grade: this.updateTopic.grade,
    //       noOfQuestions: this.updateTopic.noOfQuestions,
    //       remainingQuestions: this.remainingQuestion,
    //       time: this.updateTopic.time,
    //       subject: this.updateTopic.subject,
    //       access: this.updateTopic.access,
    //       accessCode: this.updateTopic.accessCode
    //     })
    //     console.log(this.updateTopic, "patch")
    //   });
  }
  get access() { return this.topicForm.get('access'); }
  get accessCode() { return this.topicForm.get('accessCode'); }

  public topicForm: FormGroup = new FormGroup({
    topic: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)],
      asyncValidators: this.uniqueEmailValidator(),
      updateOn: 'blur',
    }),
    ageGroup: new FormControl("", [
      Validators.required
    ]),
    subject: new FormControl("", [

    ]),
    language: new FormControl("", [
      Validators.required
    ]),
    country: new FormControl("", [
      Validators.required
    ]),
    grade: new FormControl("", [
      Validators.required
    ]),
    noOfQuestions: new FormControl("", [
      Validators.required
    ]),
    time: new FormControl("", [
      Validators.required
    ]),
    access: new FormControl("", [
    ]),
    accessCode: new FormControl("", [
    ]),
    remainingQuestions: new FormControl("", [
    ]),
  });

  topic: Array<any> = []
  subject: any
  searchText = ''
  subjectId: any
  subId: any
  ageId: any
  selectedAge: string = '';
  topicName: any
  loading: boolean
  age: any = []
  language: any = []
  country: any = []
  grade: any = []
  type: any = []
  topicId: any
  updateTopic: any
  updatedTopic: any
  length: any
  remainingQuestion: any

  ngOnInit(): void {
    this.activityService.getGeGroup()
      .subscribe(data => {
        this.age = data
        console.log(data)
      })

    this.activityService.getAllLanguage()
      .subscribe(langData => {
        this.language = langData;
        console.log(langData)
      })

    this.activityService.getCountry()
      .subscribe(countryData => {
        this.country = countryData;
        console.log(countryData)
      })

    this.activityService.getGrade()
      .subscribe(gradeData => {
        this.grade = gradeData;
        console.log(gradeData)
      })

    this.activityService.getQuestionType()
      .subscribe(typeData => {
        this.type = typeData;
        console.log(typeData)
      })
  }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.topicService.topicNameCheck(control.value).pipe(
        map((res) => {
          let resTopic: string = res.topic;
          let inputTopic: string = control.value;
          let originalTopic: string = this.updateTopic.topic
          console.log(originalTopic, inputTopic)
          return (originalTopic !== inputTopic && resTopic?.toLowerCase() === inputTopic?.toLowerCase() ? { topicExists: true } : null)
        }),
        catchError((err) => { console.log(err + 'i am error'); return null })
      )
    }
  }

  onUpdate() {
    let body = this.topicForm.value;
    body.remainingQuestions = parseInt(body.noOfQuestions) - parseInt(this.length) + this.remainingQuestion
    this.topicId = this.route.snapshot.paramMap.get('topicId');
    if (this.topicForm.get('noOfQuestions').value < this.length - this.remainingQuestion) {
      this.snackbar.open(` You have created ${this.length - this.remainingQuestion} questions. Total number of questions can not be less than created questions`, "Ok", {
        duration: 7000,
        panelClass: ['red-snackbar']
      });
      return
    }
    this.topicService.updateTopic(body, this.topicId ).subscribe(
      res => {
        this.updatedTopic = res;
        console.log(this.remainingQuestion, 'remain')
        console.log("updated", this.updateTopic);
        this.snackbar.open(" You topic has been updated", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate([`/material/view/${this.topicId}`]);
      },
      (err: any) => {
        this.snackbar.open("That topic name already exists.", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        this.router.navigate([`/material/edit-topic/${this.topicId}`]);
      });
  }
  
  isAccessChange(event: any) {
    console.log(event.checked)
    if (event.checked) {
      this.topicForm.controls['accessCode'].setValidators([Validators.required])
      this.topicForm.controls['accessCode'].updateValueAndValidity()
    }
    else {
      this.topicForm.controls['accessCode'].clearValidators()
      this.topicForm.controls['accessCode'].updateValueAndValidity()
    }
  }
}

