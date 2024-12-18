import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from '../interfaces/question.interface.ts';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private api = 'https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple';
  
  private questions: Question[] = [];
  private currentQuestionIndex = 0;
  private feedbackSubject = new BehaviorSubject<string | null>(null);
  
  feedback$ = this.feedbackSubject.asObservable();

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<any>(this.api).pipe(
      map(response => {
        console.log('API response:', response); // Log the full API response
        this.questions = response.results.map((item: any) => this.transformQuestion(item));
        return this.questions;
      })
    );
  }

  private transformQuestion(item: any): Question {
    return {
      id: Math.random(), 
      questionText: item.question,
      options: this.shuffleOptions([...item.incorrect_answers, item.correct_answer]),
      correctAnswer: item.correct_answer,
    };
  }

  private shuffleOptions(options: string[]): string[] {
    return options.sort(() => Math.random() - 0.5);
  }

  selectAnswer(answer: string): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (answer === currentQuestion.correctAnswer) {
      this.feedbackSubject.next('Correct!');
    } else {
      this.feedbackSubject.next('Wrong! The correct answer was: ' + currentQuestion.correctAnswer);
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.currentQuestionIndex = this.questions.length - 1; 
      this.feedbackSubject.next('Quiz Finished!');
    } else {
      setTimeout(() => this.feedbackSubject.next(null), 2000); 
    }
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex >= this.questions.length - 1;
  }
}
