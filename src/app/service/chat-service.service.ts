import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

const url = "https://api.coze.com/open_api/v2/chat"
const token = "Bearer pat_qovHpDd0TWTqNIiH4KPD4cRVRpkEJUna9bbzWeFoh0PWNU9j1YFXmpE9rwXO1Y3Z"
const host = "api.coze.com"
const bot_id = "7356846038512844818"
const user = "29032201862555"

@Injectable({
  providedIn: 'root'
})

export class ChatServiceService {

  constructor(private http: HttpClient) { }

  sendQuery(query: string) {
    let headers = new Headers();
    headers.append('Authorization', token)
    headers.append('Content-Type', 'application/json')
    let body = `{"conversation_id":"123","bot_id":"${bot_id}","query":"${query}","stream":true,"user":"${user}"}`
    let request = new Request(url, { headers: headers, body: body, method: 'POST' })
    return new Observable(observer => {
      // 使用Fetch API
      fetch(request).then(response => {
        // 获取到ReadableStream对象
        const reader = response.body!.getReader();

        // 递归函数来按块读取数据
        function read() {
          reader.read().then(({ done, value }) => {
            // 直到读取完成
            if (done) {
              observer.complete();
              return;
            }
            // 处理每一块数据
            const textChunk = new TextDecoder().decode(value);
            console.log(textChunk) 
            observer.next(textChunk);
            // 递归调用，继续读取下一块
            read();
          }).catch(err => {
            // 处理错误
            observer.error(err);
          });
        }
        // 开始读取数据
        read();
      });


    });
  }

}
