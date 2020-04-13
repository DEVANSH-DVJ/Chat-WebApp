import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatformComponent } from './chatform.component';

describe('ChatformComponent', () => {
  let component: ChatformComponent;
  let fixture: ComponentFixture<ChatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
