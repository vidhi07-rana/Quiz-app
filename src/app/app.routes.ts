import { Routes } from '@angular/router';
import { QuestionComponent } from './quiz/components/question/question.component';

export const routes: Routes = [
  { path: '', component: QuestionComponent }, // Default route loads the Quiz component
];
