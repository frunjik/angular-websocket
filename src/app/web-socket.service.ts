// https://vladimir-ivanov.github.io/testing/websocket/with/rxjs/and/angular.io/2017/09/13/websocket-with-angular.io-and-rxjs.html

import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";

@Injectable()
export class WebSocketService {

  constructor(@Inject(Window) private window) {
  }

  public connect(url: string): Subject<MessageEvent> {
    const ws = new this.window.WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);

      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: String) => {
        if (ws.readyState === this.window.WebSocket.OPEN) {
          ws.send(data);
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
