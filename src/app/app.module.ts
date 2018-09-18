import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WebSocketService } from "./web-socket.service";
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { WsViewComponent } from './ws-view/ws-view.component';

@NgModule({
  declarations: [
    AppComponent,
    WsViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ WebSocketService, { provide: Window,  useValue: window } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
