import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_validator/_auth/auth-guard';
import { CanDeactivateGuard } from 'src/_validator/_auth/deactive-guard';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MatchPairsComponent } from './match-pairs/match-pairs.component';
import { MCQSComponent } from './mcqs/mcqs.component';
import { OpenEndedComponent } from './open-ended/open-ended.component';
import { ScienceComponent } from './science/science.component';
import { TrueFalseComponent } from './true-false/true-false.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';
import { ViewOpenendedAnswersComponent } from './view-openended-answers/view-openended-answers.component';

const routes: Routes = [
  { path: 'type/:id/:length', component: ScienceComponent, canActivate: [AuthGuard] },
  { path: 'mcqs/:mcqsId/:length', component: MCQSComponent, canActivate: [AuthGuard] },
  { path: 'true/:trueFalseId/:length', component: TrueFalseComponent, canActivate: [AuthGuard] },
  { path: 'topic/:id', component: AddTopicComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'openEnded/:questionId/:length', component: OpenEndedComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewActivityComponent, canActivate: [AuthGuard] },
  { path: 'match/:matchId/:length', component: MatchPairsComponent, canActivate: [AuthGuard] },
  { path: 'introduction/:introId/:length', component: IntroductionComponent, canActivate: [AuthGuard] },
  { path: 'edit-topic/:topicId', component: EditTopicComponent, canActivate: [AuthGuard] },
  { path: 'viewAnswers/:questionId', component: ViewOpenendedAnswersComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, CanDeactivateGuard]

})
export class AddMaterialRoutingModule { }
