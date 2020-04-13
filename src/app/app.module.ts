import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatformComponent } from './chatform/chatform.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';

import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';

import { appRoutes } from '../routes';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupFormComponent,
    LoginFormComponent,
    ChatroomComponent,
    ChatformComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
