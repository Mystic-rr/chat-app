import { Component, ElementRef, Input, Renderer2, ViewChild, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { ChatServiceService } from '../service/chat-service.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [FormsModule,NzButtonModule,NzInputModule,ChatContentComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
  
  @ViewChild('inputarea') inputArea!: ElementRef
  @Input() query!:string

  constructor(private renderer:Renderer2,private chatService:ChatServiceService) { }

  conversation_id = 0

  ngOnInit(): void {
  }

  inputAreaFocus(){
    console.log('1')
    this.renderer.setStyle(this.inputArea.nativeElement,'background-color','white');
    this.renderer.setStyle(this.inputArea.nativeElement,'box-shadow','0 1px 4px #00000014');
    this.renderer.setStyle(this.inputArea.nativeElement,'border-color','#c4c4c4');
    this.renderer.setStyle(this.inputArea.nativeElement,'border-style','solid');
    this.renderer.setStyle(this.inputArea.nativeElement,'border-width','1px');

  }

  inputAreaBlur(){
    this.renderer.setStyle(this.inputArea.nativeElement,'background-color','#f7f7f7');
    this.renderer.setStyle(this.inputArea.nativeElement,'border-style','none');
  }

  sendQuery(){
    console.log('query start ')
    console.log(this.query)
    this.chatService.sendQuery(this.query).subscribe(
      (data)=>{
        console.log()
      }
    )
  }

}
