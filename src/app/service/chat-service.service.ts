import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { Message, ChatEvent, ChatResponse } from '../interface/chat-interface';

const url = "https://fukui-kankou-multi-language.openai.azure.com/openai/deployments/Fukui-Kankou-Multi-Language-35-Turbo/chat/completions?api-version=2024-02-01"
const token = "aab8659bd4964a688c3d717e28b58aa5"
const host = "api.coze.com"
const bot_id = "7356846038512844818"
const user = "29032201862555"

@Injectable({
  providedIn: 'root'
})

export class ChatServiceService {

  constructor(private http: HttpClient) { }

  sendQuery(query: string){
    let headers = new Headers();
    headers.append('api-key', token)
    headers.append('Content-Type', 'application/json')
    let array = new Array<Message>
    array.push({role:'user',content:query})
    let jsonbody:ChatEvent = new ChatEvent(array)
    return this.http.post(url,jsonbody,{headers:{"api-key":token,"Content-Type":"application/json"}})

  }

}
