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

  connection = null;
  subscription = null;
  service: WebSocketService = null;

  model = {
    url: '',
    input: '',
    errors: [],
    outputs: [],
  };

  constructor(
    webSocketService: WebSocketService
  ) {
    this.service = webSocketService;
  }

  ngOnInit() {
  }

  connect() {
    if (!this.connection) {
      this.model.outputs = [];
      this.connection = this.service.connect(this.model.url);
      this.subscription =
        this.connection.subscribe(s => {
          /* success */
          console.log(s);

          // this.model.outputs.push(s.data);
          const model = this.model;
          const reader = new FileReader();
          reader.onload = function() {
            model.outputs.push(reader.result);
          };
          reader.readAsText(s.data);

        }, (e) => {
          console.log(e);
          this.model.errors.push(e);
        }, () => {
        });
    }
  }

  disconnect() {
    if (this.connection) {
      // this.connection.unsubscribe();
      this.subscription.unsubscribe();
      this.subscription = null;
      this.connection = null;
    }
  }

  send() {
    if (this.connection) {
      this.connection.next(this.model.input);
      this.model.input = '';
    }
  }

}
