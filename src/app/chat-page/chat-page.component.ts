import { Component, ElementRef, Input, Renderer2, ViewChild, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { ChatServiceService } from '../service/chat-service.service';
import { ChatResponse, Message, ViewMessage } from '../interface/chat-interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzInputModule, ChatContentComponent,NzIconModule,CommonModule,NzDividerModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {

  @ViewChild('inputarea') inputArea!: ElementRef
  @Input() query!: string

  constructor(private renderer: Renderer2, private chatService: ChatServiceService) { }

  ngOnInit(): void {
  }

  messages = new Array<ViewMessage>
  sort = 0

  inputAreaFocus() {
    console.log('1')
    this.renderer.setStyle(this.inputArea.nativeElement, 'background-color', 'white');
    this.renderer.setStyle(this.inputArea.nativeElement, 'box-shadow', '0 1px 4px #00000014');
    this.renderer.setStyle(this.inputArea.nativeElement, 'border-color', '#c4c4c4');
    this.renderer.setStyle(this.inputArea.nativeElement, 'border-style', 'solid');
    this.renderer.setStyle(this.inputArea.nativeElement, 'border-width', '1px');

  }

  inputAreaBlur() {
    this.renderer.setStyle(this.inputArea.nativeElement, 'background-color', '#f7f7f7');
    this.renderer.setStyle(this.inputArea.nativeElement, 'border-style', 'none');
  }

  sendQuery() {
    console.log('query start ')
    if(this.query !== '' && this.query !== null){
      let queryContent = this.query
      this.query = ''
      this.messages.push({ content: queryContent, role: 'user', sort: this.sort++ })
      this.chatService.sendQuery(queryContent).subscribe(
        (res) => {
          let data = res as ChatResponse
          this.messages.push({ content: data.choices[0].message.content, role: data.choices[0].message.role, sort: this.sort++ })
        }
      )
    }
    
  }

  handleKeyDown(event: KeyboardEvent) {
    // 如果按下的是回车键并且没有同时按下Alt键
    if (event.key === 'Enter' && !event.altKey) {
      // 阻止默认的回车键行为，即在这个例子中，阻止换行
      event.preventDefault()
      // 在这里执行回车键按下时需要做的事情
      console.log('Enter key pressed without Alt key.')
      this.sendQuery()
    }
  
    // 如果同时按下了Alt键和回车键
    if (event.key === 'Enter' && event.altKey) {
      // 执行换行或其他操作，但默认的textarea行为已经允许Alt+Enter换行，所以可能不需要额外操作
      console.log('Alt+Enter was pressed.')
    }
  }

  clear(){
    this.query = ''
  }

}
