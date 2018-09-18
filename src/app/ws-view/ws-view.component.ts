import { Component, OnInit } from '@angular/core';
import { WebSocketService } from "../web-socket.service";

@Component({
  selector: 'app-ws-view',
  templateUrl: './ws-view.component.html',
  styleUrls: ['./ws-view.component.css']
})
export class WsViewComponent implements OnInit {

  urls = [
    "wss://echo.websocket.org",
    "wss://localhost:8888"
  ];

  subscription = null;
  webConnection = null;
  webSocketService: WebSocketService = null;

  model = {
    url: '',
    input: '',
    outputs: [],
  };

  constructor(
    webSocketService: WebSocketService
  ) { 
    this.webSocketService = webSocketService;
  }

  ngOnInit() {
  }

  connect() {
    this.model.outputs = [];
    this.webConnection = this.webSocketService.connect(this.model.url);
    this.subscription =
      this.webConnection.subscribe(s => {
        /* success */
        // console.log(s);
        this.model.outputs.push(s.data);
      }, () => {
      }, () => {
      });    
  }

  disconnect() {
    if(this.webConnection) {
      this.webConnection.unsubscribe();
      this.webConnection = null;
      this.subscription = null;
    }
  }

  send() {
    this.webConnection.next(this.model.input);
    this.model.input = '';
  }

}
