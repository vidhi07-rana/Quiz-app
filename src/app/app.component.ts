import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AnswerComponent } from "./quiz/components/answer/answer.component";
import { QuestionComponent } from "./quiz/components/question/question.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule,MatButtonModule, QuestionComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Quiz-Project';
}
