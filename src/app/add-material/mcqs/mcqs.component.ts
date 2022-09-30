import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicsService } from 'src/app/service/topics.service';
import { Output, EventEmitter } from '@angular/core';
import { mimetype } from "../../../_validator/mime-type-validator";
import { DataService } from 'src/app/service/curd-data-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mcqs',
  templateUrl: './mcqs.component.html',
  styleUrls: ['./mcqs.component.scss']
})

export class MCQSComponent implements OnInit {

  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar, private dataService: DataService,
    private topicService: TopicsService) { }
  mcqs: Array<any> = []
  topicId: any
  topic: any
  topicGetById: any
  typeId: any
  mcqImages: Array<any> = []
  imageBlobUrl: Array<any> = [];
  Pickedimage: string;
  id: any;
  isAddMode: boolean;
  loading: boolean
  submitted = false;
  mcqsForm: any;
  questionData: any
  updatedQuestion: any
  imageUrl: any
  length: any

  get sequence() { return this.mcqsForm.get('sequence'); }

  ngOnInit(): void {

    this.dataService.setUrl(`${environment.web_URL}/api/mcqs`)
    this.id = this.route.snapshot.paramMap.get('mcqsId');
    this.length = this.route.snapshot.paramMap.get('length');

    this.isAddMode = !this.id;
    console.log(this.id)
    this.mcqsForm = new FormGroup({
      mcqs: new FormControl("", [
        Validators.required
      ]),
      option1: new FormControl("", [
        Validators.required
      ]),
      option2: new FormControl("", [
        Validators.required
      ]),
      option3: new FormControl("", [
        Validators.required
      ]),
      option4: new FormControl("", [
        Validators.required
      ]),
      answer: new FormControl("", [
        Validators.required
      ]),
      // file: new FormControl('', {
      //   validators: [Validators.required],
      //   asyncValidators: [mimetype]
      // }),
      file: new FormControl("", [
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
      ])
    })

    if (!this.isAddMode) {
      console.log(this.id)
      this.dataService.getQuestionById(this.id).subscribe(
        res => {
          this.questionData = res;
          this.imageUrl = this.questionData.file
          this.topicId = this.questionData.topicId
          this.mcqsForm.patchValue({
            mcqs: this.questionData.mcqs,
            sequence: this.questionData.sequence,
            option1: this.questionData.option1,
            option2: this.questionData.option2,
            option3: this.questionData.option3,
            option4: this.questionData.option4,
            answer: this.questionData.answer,
            posFeedback: this.questionData.posFeedback,
            negFeedback: this.questionData.negFeedback,
            file: this.questionData.file
          })
          console.log(this.questionData)
        }, err => {
          console.log(err.status + 'i am error')
        });
    }
  }
  get file() { return this.mcqsForm.get('file'); }

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
    this.topic = this.route.snapshot.paramMap.get('id')
    const formData = new FormData();
    if (this.mcqsForm.get('file').value) {
      formData.append('file', this.mcqsForm.get('file').value);
    }
      if (this.mcqsForm.get('sequence').value > this.length) {
      this._snackBar.open(`Your total questions are ${this.length}. Please enter a valid sequence number.`, "Ok", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      this.loading = false
      return
    }

    formData.append("mcqs", this.mcqsForm.get('mcqs').value)
    formData.append("option1", this.mcqsForm.get('option1').value)
    formData.append("option2", this.mcqsForm.get('option2').value)
    formData.append("option3", this.mcqsForm.get('option3').value)
    formData.append("option4", this.mcqsForm.get('option4').value)
    formData.append("answer", this.mcqsForm.get('answer').value)
    formData.append("sequence", this.mcqsForm.get('sequence').value)
    formData.append("posFeedback", this.mcqsForm.get('posFeedback').value)
    formData.append("negFeedback", this.mcqsForm.get('negFeedback').value)

    this.dataService.addAll(formData, this.topic)
      .subscribe(
        res => {
          console.log(res + 'I am mcqs')
          this._snackBar.open(" Your Question has been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.SetAsSubmitted(true);
          this.loading = false
          this.mcqsForm.reset();
        },
        err => {
          console.log('I am error' + err)
          this._snackBar.open('You question has not posted', 'Ok', {
            duration: 5000,
            panelClass: ['red-snackbar']
          })
          this.loading = false
        });
  }

  updateQuestion() {
    const formData = new FormData();
    if (this.mcqsForm.get('file').value) {
      formData.append('file', this.mcqsForm.get('file').value);
    }
    if (this.mcqsForm.get('sequence').value > this.length) {
      this._snackBar.open(`Your total questions are ${this.length}. Please enter a valid sequence number.`, "Ok", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      this.loading = false
      return
    }
    formData.append("mcqs", this.mcqsForm.get('mcqs').value)
    formData.append("option1", this.mcqsForm.get('option1').value)
    formData.append("option2", this.mcqsForm.get('option2').value)
    formData.append("option3", this.mcqsForm.get('option3').value)
    formData.append("option4", this.mcqsForm.get('option4').value)
    formData.append("answer", this.mcqsForm.get('answer').value)
    formData.append("sequence", this.mcqsForm.get('sequence').value)
    formData.append("posFeedback", this.mcqsForm.get('posFeedback').value)
    formData.append("negFeedback", this.mcqsForm.get('negFeedback').value)
    this.dataService.updateQuestion(formData, this.questionData._id).subscribe(
      res => {
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
    this.mcqsForm.patchValue({ file: file })
    this.mcqsForm.get('file').updateValueAndValidity();
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
  }
}