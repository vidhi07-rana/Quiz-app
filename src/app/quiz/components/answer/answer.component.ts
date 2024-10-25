import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent {
  @Input() options: string[] = [];
  @Input() correctAnswer!: string;
  @Output() answerSelected = new EventEmitter<boolean>();

  onSelect(selectedOption: string) {
    const isCorrect = selectedOption === this.correctAnswer;
    this.answerSelected.emit(isCorrect); // Emit the result back to the parent component
  }
}
