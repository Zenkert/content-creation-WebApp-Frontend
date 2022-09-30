import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/curd-data-service';
import { environment } from 'src/environments/environment';
import { TopicsService } from 'src/app/service/topics.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }

  introduction: Array<any> = []
  topic: string
  id: any;
  isAddMode: boolean;
  submitted = false;
  introForm: any;
  questionData: any
  updatedQuestion: any
  topicId: any
  loading: boolean
  Pickedimage: string;
  imageUrl: any
  length: any

  constructor(
    private _snackBar: MatSnackBar, private dataService: DataService,
    private router: Router, private route: ActivatedRoute, private topicService: TopicsService) { }

  get sequence() { return this.introForm.get('sequence'); }

  ngOnInit(): void {
      // this.topicIdParams = this.route.snapshot.paramMap.get('id');
      // this.topicService.getTopicByTopicId(this.topicIdParams).subscribe(
      //   res => {
      //     this.topicData = res
      //   }
      // )
    
    this.dataService.setUrl(`${environment.web_URL}/api/intro`)
    this.id = this.route.snapshot.paramMap.get('introId');
    this.length = this.route.snapshot.paramMap.get('length');

    this.isAddMode = !this.id;
    console.log(this.id)
    this.introForm = new FormGroup({
      introduction: new FormControl("", [
        Validators.required
      ]),
      sequence: new FormControl("", [
        Validators.required,
        Validators.min(1)
      ]),
      file: new FormControl("", [
      ]),
      link: new FormControl("", [
      ]),
    })

    if (!this.isAddMode) {
      console.log(this.id)
      this.dataService.getQuestionById(this.id).subscribe(
        res => {
          this.questionData = res;
          this.imageUrl = this.questionData.file
          this.topicId = this.questionData.topicId
          this.introForm.patchValue({
            introduction: this.questionData.introduction,
            sequence: this.questionData.sequence,
            file: this.questionData.file,
            link: this.questionData.link
          })
          console.log(this.questionData)
        }, err => {
          console.log(err.status + 'i am error')
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
    this.topic = localStorage.getItem('topicId')
    const formData = new FormData();
    if (this.introForm.get('file').value) {
      formData.append('file', this.introForm.get('file').value);
    }
    if (this.introForm.get('link').value) {
      formData.append("link", this.introForm.get('link').value)
    }

    if (this.introForm.get('sequence').value > this.length) {
      this._snackBar.open(`Your total questions are ${this.length}. Please enter a valid sequence number.`, "Ok", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      this.loading = false
      return
    }
    formData.append("introduction", this.introForm.get('introduction').value)
    formData.append("sequence", this.introForm.get('sequence').value)

    this.dataService.addAll(formData, this.topic)
      .subscribe(
        res => {
          this.introduction = res;
          this._snackBar.open(" Your Introduction has been Posted", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.loading = false
          this.SetAsSubmitted(true);
          this.introForm.reset();
        },
        err => {
          console.log(err)
          this._snackBar.open(" Your Introduction has not been Posted", "Ok", {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
          this.loading = false
        });
  }

  updateQuestion() {
    const formData = new FormData();
    if (this.introForm.get('file').value) {
      formData.append('file', this.introForm.get('file').value);
    }
    if (this.introForm.get('link').value) {
      formData.append("link", this.introForm.get('link').value)
    }
    if (this.introForm.get('sequence').value > this.length) {
      this._snackBar.open(`Your total questions are ${this.length}. Please enter a valid sequence number.`, "Ok", {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      this.loading = false
      return
    }
    formData.append("introduction", this.introForm.get('introduction').value)
    formData.append("sequence", this.introForm.get('sequence').value)

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
    this.introForm.patchValue({ file: file })
    this.introForm.get('file').updateValueAndValidity();
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
    this.introForm.patchValue({
      file: ''
    })
  }
}
