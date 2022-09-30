import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMaterialRoutingModule } from './add-material-routing.module';
import { ScienceComponent } from './science/science.component';
import { MCQSComponent } from './mcqs/mcqs.component';
import { MaterialModule } from '../angular_material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { TrueFalseComponent } from './true-false/true-false.component';
import { OpenEndedComponent } from './open-ended/open-ended.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MatchPairsComponent } from './match-pairs/match-pairs.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { ViewOpenendedAnswersComponent } from './view-openended-answers/view-openended-answers.component';

@NgModule({
  declarations: [
    ScienceComponent,
    MCQSComponent,
    AddTopicComponent,
    TrueFalseComponent,
    OpenEndedComponent,
    ViewActivityComponent,
    IntroductionComponent,
    MatchPairsComponent,
    EditTopicComponent,
    ViewOpenendedAnswersComponent,

  ],
  imports: [
    CommonModule,
    AddMaterialRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSnackBarModule,
  ]
})
export class AddMaterialModule { }
