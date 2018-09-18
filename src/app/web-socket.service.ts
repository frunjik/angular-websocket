
// https://vladimir-ivanov.github.io/testing/websocket/with/rxjs/and/angular.io/2017/09/13/websocket-with-angular.io-and-rxjs.html

import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";

@Injectable()
export class WebSocketService {
  private subject: Subject<MessageEvent>;

  constructor(@Inject(Window) private window) {
  }

  public connect(url: string): Subject<MessageEvent> {
    /* JvH: There is a problem when opening a new connection to different url ??? */
    if (!this.subject) {
      this.subject = this.create(url);
    }

    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    const ws = new this.window.WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);

      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === this.window.WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
