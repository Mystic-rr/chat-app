import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [FormsModule,NzButtonModule,NzInputModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
  
  @ViewChild('inputarea') inputArea!: ElementRef

  constructor(private renderer:Renderer2) { }

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
  }
}
