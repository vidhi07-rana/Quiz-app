import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnswerComponent } from '../answer/answer.component';
import { Question } from '../../interfaces/question.interface.ts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, MatCardModule, AnswerComponent,MatButtonModule, MatIconModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  currentQuestion!: Question;
  currentQuestionIndex: number = 0;
  questions: Question[] = [];

  constructor(private quizService: QuizService) {
    this.loadQuestions();
  }

  loadQuestions() {
    this.quizService.getQuestions().subscribe((questions) => {
      if (questions.length > 0) {
        this.questions = questions;
        this.currentQuestion = this.questions[this.currentQuestionIndex]; // Load first question
      } else {
        console.error('No questions received from the API');
      }
    });
  }

  onAnswerSelected(isCorrect: boolean) {
    // Handle answer selection (optional: show feedback or update score)
    console.log(`Answer is ${isCorrect ? 'correct' : 'incorrect'}`);

    // Move to the next question after selection
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }
}
