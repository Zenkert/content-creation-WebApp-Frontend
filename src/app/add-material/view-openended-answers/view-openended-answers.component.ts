import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenEndedAnswersService } from 'src/app/service/open-ended-answers.service';
@Component({
  selector: 'app-view-openended-answers',
  templateUrl: './view-openended-answers.component.html',
  styleUrls: ['./view-openended-answers.component.scss']
})
export class ViewOpenendedAnswersComponent implements OnInit {
questionId: any
answerData: Array<any> = []
  constructor(private answerService: OpenEndedAnswersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.answerService.getOpenEndedAnswers(this.questionId).subscribe(
      res => {
        this.answerData = <any>res
        console.log(this.answerData, "answer response")
      },
      err => {
        console.log(err)
      })
  }

}
