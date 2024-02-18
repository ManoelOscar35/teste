import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from '../shared/storeservice.service';
import { Router } from '@angular/router';
import { TypeQuestion } from '../models/typeQuestion';
import { Answers } from '../models/answers';
import { TypeQuestion2 } from '../models/typeQuestion2';
import { Topics } from '../models/topics';
import { Subject, takeUntil } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { TypeQuestionRM } from '../models/typeQuestionRM';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.css']
})
export class AddAnswersComponent implements OnInit, OnDestroy {

  selected: boolean = false;
  gridBool!: boolean;
  rmBool!: boolean;
  topicsBool!: boolean;
  textarea: string = '';
  answers: string[] = [];
  answers2!: Answers[];
  answersGrid: string[] = [];
  typeQuestion: TypeQuestion[] = [];
  typeQuestion2: TypeQuestion2[] = [];
  typeQuestionRM: TypeQuestionRM[] = [];
  question!: string;
  myQuestion: string = "";
  data: TypeQuestion[] = [];
  unsubscribe$: Subject<any> = new Subject<any>();

  selectedTopics: boolean = false;
  topics: string[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private storeService: StoreService,
    private router: Router
  ) 
  {}

  ngOnInit() { 

    this.apiService.getAnswers()
      .pipe(
        take(1),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (res: Answers[]) => {
          console.log("54",res)
          this.answers2 = res
        }
      });

    this.apiService.getTypeQuestion()
    .pipe(
      takeUntil(this.unsubscribe$),
      delay(3000), // Atrasa a emissão por 3000 milissegundos (3 segundos)
    )
    .subscribe({
      next: (res: TypeQuestion[]) =>  {
        this.typeQuestion = res,
        console.log("perg.1",this.typeQuestion)
      }
    });

    this.apiService.getTypeQuestion2()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: TypeQuestion2[]) =>  {
        this.typeQuestion2 = res,
        console.log(this.typeQuestion2)
        
      }
    });

    this.apiService.getTypeQuestionRM()
    .pipe(
      takeUntil(this.unsubscribe$),
      delay(3000), // Atrasa a emissão por 3000 milissegundos (3 segundos)
    )
    .subscribe({
      next: (res: TypeQuestionRM[]) =>  {
        this.typeQuestionRM = res,
        console.log(this.typeQuestionRM)
        
      }
    });

    this.storeService.getMyQuestion()
      .pipe(
        takeUntil(this.unsubscribe$),
        take(1)
      )
      .subscribe({ 
        next: (res: string) => this.question = res
      });
  }
  
  add() {
    this.storeService.getGridBool().subscribe({
      next: (res: boolean) => {
        this.gridBool = res
        console.log(this.gridBool)
      }
    });
    this.storeService.getRMBool().subscribe({
      next: (res: boolean) => {
        this.rmBool = res
        console.log(this.rmBool)
      }
    });
    console.log("depois do oninit , 77 -> ",this.typeQuestion)
    if(!this.gridBool) {
      this.answers = this.textarea.split('\n');
      console.log('respostas-linha-55: ', this.answers)

      for(let i = 0; i < this.answers.length; i++) {
        this.apiService.postAnswers({answer: this.answers[i], selected: this.selected}).subscribe();
      }
      
      
      for(let i = 0; i < this.typeQuestion.length; i++) {
        if(this.typeQuestion[i].typeQuestion.answers.length == 0 ) {
          console.log("Chegou!!")
          this.apiService.editTypeQuestion({id: this.typeQuestion[i].id, typeQuestion: {typeQuestion: this.typeQuestion[i].typeQuestion.typeQuestion, question: this.typeQuestion[i].typeQuestion.question, answers: [ {id: 1, answer: this.answers[0], selected:  this.selected}, {id: 2, answer: this.answers[1], selected: this.selected}]} }).subscribe();
         
        }
      }
      
      
    
      
      this.storeService.setRouterAnswer(true);
      this.storeService.setGridBool(false);
      this.storeService.setRuBool(true);
      window.location.reload()
      this.closeComponent();
    }

    if(this.gridBool && !this.rmBool) {
      console.log(this.answers2)
      if(this.answers2.length == 0) {
        this.answersGrid = this.textarea.split('\n');
        for(let i = 0; i < this.answersGrid.length; i++) {
          this.apiService.postAnswers({answer: this.answersGrid[i], selected: this.selected}).subscribe();
        } 
        console.log('gridBool -> ',this.gridBool)  
        this.storeService.setRuBool(false);
      } else {
        this.topics = this.textarea.split('\n');
        console.log(this.topics)
        for(let i = 0; i < this.topics.length; i++) {
          this.apiService.postTopics({topic: this.topics[i], selectedTopics: this.selectedTopics}).subscribe({
            next: (res: Topics) => this.storeService.setRuBool(false)
          });
        }

        for(let i = 0; i < this.typeQuestion2.length; i++) {
          if(this.typeQuestion2[i].typeQuestion.answers.length == 0 && this.typeQuestion2[i].typeQuestion.topics.length == 0) {
            this.apiService.editTypeQuestion2({id: this.typeQuestion2[i].id, typeQuestion: {typeQuestion: this.typeQuestion2[i].typeQuestion.typeQuestion, question: this.question, answers: [  {id: 1, answer: this.answers2[0].answer, selected:  this.selected}, {id: 2, answer: this.answers2[1].answer, selected: this.selected},
            {id: 3, answer: this.answers2[2].answer, selected: this.selected}], 
            topics: [{id: 1, topic: this.topics[0], selectedTopics: this.selectedTopics}, {id: 2, topic: this.topics[1], selectedTopics: this.selectedTopics}, {id: 3, topic: this.topics[2], selectedTopics: this.selectedTopics}]} }).subscribe({
              next: (res: TypeQuestion2) => {
                this.storeService.setRuBool(false);
                this.storeService.setGridBool(true);
              } 
            });
          }
        }

        this.storeService.setRuBool(false);
      }
      
      this.storeService.setRouterAnswer(true);
      this.storeService.setRuBool(false);
      this.storeService.setGridBool(true);
      setTimeout(() => {
        window.location.reload();
        this.closeComponent();
      }, 1000);
    } else if(this.rmBool == true) {
      this.answers = this.textarea.split('\n');
      console.log('respostas-linha-55: ', this.answers)

      for(let i = 0; i < this.answers.length; i++) {
        this.apiService.postAnswers({answer: this.answers[i], selected: this.selected}).subscribe();
      }
      
      
      for(let i = 0; i < this.typeQuestionRM.length; i++) {
        if(this.typeQuestionRM[i].typeQuestion.answers.length == 0 ) {
          console.log("Chegou!!")
          this.apiService.editTypeQuestionRM({id: this.typeQuestionRM[i].id, typeQuestion: {typeQuestion: this.typeQuestionRM[i].typeQuestion.typeQuestion, question: this.typeQuestionRM[i].typeQuestion.question, answers: [ {id: 1, answer: this.answers[0], selected:  this.selected}, {id: 2, answer: this.answers[1], selected: this.selected}]} }).subscribe();
          this.storeService.setRuBool(false);
          this.storeService.setRMBool(true);
        }
      }
      
      
    
      
      this.storeService.setRouterAnswer(true);
      this.storeService.setGridBool(false);
      this.storeService.setRuBool(false);
      this.storeService.setRMBool(true);
      window.location.reload();
      this.closeComponent();
    }

  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

}
