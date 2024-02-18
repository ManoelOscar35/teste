import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddAnswersComponent } from './add-answers/add-answers.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { AnswersComponent } from './answers/answers.component';
import { BotaoExcluirComponent } from './botao-excluir/botao-excluir.component';
import { EditanswersComponent } from './editanswers/editanswers.component';
import { HomeComponent } from './home/home.component';
import { MultiUpdComponent } from './multi-upd/multi-upd.component';
import { TopicsComponent } from './topics/topics.component';


@NgModule({
  declarations: [
    AppComponent,
    AddAnswersComponent,
    AnswersComponent,
    BotaoExcluirComponent,
    EditanswersComponent,
    HomeComponent,
    MultiUpdComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
