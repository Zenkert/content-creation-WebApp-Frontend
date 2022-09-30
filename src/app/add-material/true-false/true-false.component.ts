import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { TopicsService } from 'src/app/service/topics.service';
import { DataService } from 'src/app/service/curd-data-service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.scss']
})
export class TrueFalseComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }
  id: any;
  isAddMode: boolean;
  submitted = false;
  questionData: any
  updatedQuestion: any
  topicId: any
  trueFalse: Array<any> = []
  topicGetById: any
  trueFalseForm: any
  loading: boolean
  Pickedimage: string;
  imageUrl: any
  length: any

  get sequence() { return this.trueFalseForm.get('sequence'); }

  constructor(private route: ActivatedRoute,
    private _snackBar: MatSnackBar, private dataService: DataService,
    private router: Router, private topicService: TopicsService) { }

  ngOnInit(): void {
    this.dataService.setUrl(`${environment.web_URL}/api/true_false`)

    this.id = this.route.snapshot.paramMap.get('trueFalseId');
    this.length = this.route.snapshot.paramMap.get('length');

    this.isAddMode = !this.id;
    console.log(this.id)
    this.trueFalseForm = new FormGroup({
      question: new FormControl("", [
        Validators.required
      ]),
      answer: new FormControl("", [
        Validators.required
      ]),
      posFeedback: new FormControl("", [
        Validators.required
      ]),
      negFeedback: new FormControl("", [
        Validators.required
      ]),
      sequence: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      file: new FormControl("", [
      ]),
    })

    if (!this.isAddMode) {
      console.log(this.id)
      this.dataService.getQuestionById(this.id).subscribe(
        res => {
          this.questionData = res;
          this.imageUrl = this.questionData.file
          this.topicId = this.questionData.topicId
          this.trueFalseForm.patchValue({
            question: this.questionData.question,
            sequence: this.questionData.sequence,
            answer: this.questionData.answer,
            posFeedback: this.questionData.posFeedback,
            negFeedback: this.questionData.negFeedback,
            file: this.questionData.file
          })
          console.log(this.questionData)
        }, err => {
          console.log(err + 'i am error')
        });
    }
  }

  onSubmit() {
    //   this.submitted = true;

    //   // reset alerts on submit
    //   this._snackBar.dismiss();

    //   // stop here if form is invalid
    //   if (this.openEndedForm.invalid) {
    //     return;
    //   }

    this.loading = true;
    if (this.isAddMode) {
      this.createQuestion();
    } else {
      this.updateQuestion();
    }
  }


  createQuestion() {
    this.topicId = this.route.snapshot.paramMap.get('id')
    const formData = new FormData();
    if (this.trueFalseForm.get('file').value) {
      formData.append('file', this.trueFalseForm.get('file').value);
    }
    if (this.trueFalseForm.get('sequence').value > this.length) {
      this._snackBar.open(`Your total questions are ${this.length}. Please enter a valid sequence number.`, "Ok", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      this.loading = false
      return
    }
    formData.append("question", this.trueFalseForm.get('question').value)
    formData.append("sequence", this.trueFalseForm.get('sequence').value)
    formData.append("posFeedback", this.trueFalseForm.get('posFeedback').value)
    formData.append("negFeedback", this.trueFalseForm.get('negFeedback').value)
    formData.append("answer", this.trueFalseForm.get('answer').value)

    this.dataService.addAll(formData, this.topicId)
      .subscribe(res => {
        console.log(res)
        this._snackBar.open(" Your Question has been created", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.loading = false
        this.SetAsSubmitted(true);
        this.trueFalseForm.reset();
      },
        err => {
          console.log(err)
          this._snackBar.open(" Your Question has not been created", "Ok", {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
          this.loading = false
        });
  }

  updateQuestion() {
    const formData = new FormData();
    if (this.trueFalseForm.get('file').value) {
      formData.append('file', this.trueFalseForm.get('file').value);
    }

    if (this.trueFalseForm.get('sequence').value > this.length) {
      this._snackBar.open(`Your total questions are ${this.length}. Please enter a valid sequence number.`, "Ok", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      this.loading = false
      return
    }
    formData.append("question", this.trueFalseForm.get('question').value)
    formData.append("sequence", this.trueFalseForm.get('sequence').value)
    formData.append("posFeedback", this.trueFalseForm.get('posFeedback').value)
    formData.append("negFeedback", this.trueFalseForm.get('negFeedback').value)
    formData.append("answer", this.trueFalseForm.get('answer').value)

    this.dataService.updateQuestion(formData, this.questionData._id).subscribe(
      res => {
        console.log("response:", res)
        this.updatedQuestion = res;
        this._snackBar.open(" Your Question has been updated", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.loading = false
        this.router.navigate([`/material/view/${this.topicId}`]);
      },
      err => {
        console.log(err + 'error');
        this._snackBar.open(" Your Question has not been updated", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        this.loading = false
      });
  }

  PickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.trueFalseForm.patchValue({ file: file })
    this.trueFalseForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.Pickedimage = reader.result as string;
      console.log(this.Pickedimage)
    };
    reader.readAsDataURL(file);
  }

  DeleteImage() {
    this.Pickedimage = ''
  }

  DeleteImageBackend() {
    this.imageUrl = ''
    this.trueFalseForm.patchValue({
      file: ''
    })
  }
}
