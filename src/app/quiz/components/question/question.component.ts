import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnswerComponent } from '../answer/answer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Question } from '../../interfaces/question.interface.ts';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, MatCardModule, AnswerComponent, MatButtonModule, MatIconModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  currentQuestion!: Question;
  currentQuestionIndex: number = 0;
  questions: Question[] = [];
  score: number = 0; 
  quizCompleted: boolean = false; 
  isLoading: boolean = true; 


  constructor(private quizService: QuizService) {
    this.loadQuestions();
  }

  loadQuestions() {
    this.isLoading = true;
    this.quizService.getQuestions().subscribe((questions) => {
      if (questions.length > 0) {
        this.questions = questions;
        this.currentQuestionIndex = 0; 
        this.currentQuestion = this.questions[this.currentQuestionIndex]; 
      }
    });
  }

  onAnswerSelected(isCorrect: boolean) {
    if (isCorrect) {
      this.score++; 
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.nextQuestion();
    } else {
      this.quizCompleted = true; 
    }
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

  restartQuiz() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.quizCompleted = false;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }
}
