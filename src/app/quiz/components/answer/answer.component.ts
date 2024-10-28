import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, ],
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() correctAnswer!: string;

  selectedOption: string | null = null;

  @Output() answerSelected = new EventEmitter<boolean>();

  constructor(private quizService: QuizService) {}

  ngOnInit() {}

  onSelect(option: string) {
    this.selectedOption = option;
    this.quizService.selectAnswer(option);

    const isCorrect = this.selectedOption === this.correctAnswer;
    this.answerSelected.emit(isCorrect);
  }

  isCorrect(option: string): boolean {
    return option === this.correctAnswer; // Check if option is correct
  }
}
