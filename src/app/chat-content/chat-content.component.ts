import { Component, Input } from '@angular/core';
import { ViewMessage } from '../interface/chat-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.css'
})
export class ChatContentComponent {
  @Input() messages!:Array<ViewMessage>

  show(){
    console.log(this.messages)
  }
}
