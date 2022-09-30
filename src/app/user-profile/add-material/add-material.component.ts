import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityFormService } from 'src/app/service/activity-form.service';
@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {
  public activityForm: FormGroup = new FormGroup({
    subject: new FormControl("", [
      Validators.required]),
    ageGroup: new FormControl("",
      [Validators.required]),
    language: new FormControl("",
      [Validators.required]),
    activities: new FormControl("",
      [Validators.required]),
    topic: new FormControl("",
      [Validators.required])

  });

  constructor(private route: ActivatedRoute, private typeService: ActivityFormService) { }

  subject: any = []
  subId: any
  type: any = []
  topicId: any
  isSubjectSelected = false
  isLangSelected = false
  isDarkTheme: boolean = false
  ngOnInit(): void {
    this.typeService.getSubject()
      .subscribe(res => {
        this.subject = res
        console.log(res)
      })
    this.topicId = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('topicId', this.topicId);
    console.log(localStorage.getItem('topicId'))
    this.typeService.getQuestionType()
      .subscribe(res => {
        this.type = res
        console.log(res)
      })
  }
  onSubmit() {

  }
  onSubjectSelection(value: any) {
    // debugger
    // if(value != null) {
    this.activityForm.get("ageGroup")?.enable()
    // }
    this.isSubjectSelected = value != null
  }

}
