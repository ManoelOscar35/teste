import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';
import { TopicsComponent } from './topics/topics.component';

const routes: Routes = [
  {path: 'answer', component: AnswersComponent},
  {path: 'topic', component: TopicsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
