import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from "../web-socket.service";

import { WsViewComponent } from './ws-view.component';

describe('WsViewComponent', () => {
  let component: WsViewComponent;
  let fixture: ComponentFixture<WsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ WsViewComponent ],
      providers: [
        WebSocketService,
        {
          provide: Window,
          useValue: {WebSocket: {}},
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
