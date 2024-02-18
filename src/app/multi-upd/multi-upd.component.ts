import { Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Answers } from '../models/answers';
import { Subject, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Topics } from '../models/topics';
import { StoreService } from '../shared/storeservice.service';
import { TypeQuestion } from '../models/typeQuestion';
import { TypeQuestion2 } from '../models/typeQuestion2';
import { TypeQuestionRM } from '../models/typeQuestionRM';

@Component({
  selector: 'app-multi-upd',
  templateUrl: './multi-upd.component.html',
  styleUrls: ['./multi-upd.component.css']
})
export class MultiUpdComponent implements OnInit, OnDestroy {

  answersUpdate: string[] = [];
  answers: Answers[] = [];
  data: string[] = [];
  answersFront: string = '';
  answersBool!: boolean;
  addRuRecorded!: boolean;
  addRmRecorded!: boolean;
  addGridRecorded!: boolean;
  typeQuestion!: TypeQuestion;
  typeQuestionRM!: TypeQuestionRM;
  typeQuestion2!: TypeQuestion2;
  topics!: Topics[];
  topics2!: string[];
  gridTopicsBool!: boolean;
  answersTopicsBool!: boolean;
  selected: boolean = false;
  selectedTopics: boolean = false;
  objetosAnswersReordenados!: Answers[];
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private storeService: StoreService,
    private router: Router
  ) 
  {}

  ngOnInit() {
    this.storeService.getAnswersTopicsBool().subscribe({
      next: (res: boolean) => {
        console.log(res)
        this.answersTopicsBool = res
      }
    });

    this.storeService.getAddRuRecordedBool().subscribe({
      next: (res: boolean) => {
        this.addRuRecorded = res
        console.log( this.addRuRecorded )
      }
    });

    this.storeService.getAddRmRecordedBool().subscribe({
      next: (res: boolean) => {
        this.addRmRecorded = res
        console.log( this.addRmRecorded )
      }
    });

    this.storeService.getAddGridRecordedBool().subscribe({
      next: (res: boolean) => {
        this.addGridRecorded = res
        console.log( this.addGridRecorded )
      }
    });

    this.storeService.getGridTopicsBool().subscribe({
      next: (res: boolean) => {
        this.gridTopicsBool = res

        if(this.gridTopicsBool == true) {
          this.addGridRecorded = false;
          console.log(this.addGridRecorded)
        } 
        
        console.log( this.gridTopicsBool )
      }
    });

    if(this.answersTopicsBool) {
      this.getAnswers();
    }else {
      this.getTopics();
    }

    this.getRuRecordedMethod();
    this.getRmRecordedMethod();
    this.getGridRecordedMethod();

    this.getTypeQuestion();
    this.getTypeQuestion2();
    this.getTypeQuestionRM();
  }

  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.answers = res;
        console.log("multiupd -> ",this.answers)
        if(this.answers.length != 0) {
          for(let i = 0; i < this.answers.length; i++) {
            this.answersUpdate.push(this.answers[i]?.answer) 
          }
          console.log('answersUpdate -> ', this.answersUpdate)
        }
      }
    })
  }

  getTypeQuestion() {
    if(this.addRuRecorded == true) {
      this.apiService.getTypeQuestion()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (res: TypeQuestion[]) => {
          console.log(res)
          for(let i = 0; i < res.length; i++) {
            if(res[i].id == this.typeQuestion.id) {
              this.answersUpdate = []
              this.typeQuestion.typeQuestion.answers.forEach((element: Answers) => {
                this.answersUpdate.push(element.answer)
              });
            }
          }
        }
      })
    }
  }

  getTypeQuestion2() {
    if(this.addGridRecorded == true || this.gridTopicsBool == true) {
      this.apiService.getTypeQuestion2()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (res: TypeQuestion2[]) => {
          for(let i = 0; i < res.length; i++) {
            if(res[i].id == this.typeQuestion2.id) {
              if(this.gridTopicsBool == true) {
                this.answersUpdate = []
                this.typeQuestion2.typeQuestion.topics.forEach((element: Topics) => {
                  this.answersUpdate.push(element.topic)
                });
              } else {
                this.answersUpdate = []
                this.typeQuestion2.typeQuestion.answers.forEach((element: Answers) => {
                  this.answersUpdate.push(element.answer)
                });
              }
            }
          }
        }
      })
    }
  }

  getTypeQuestionRM() {
    if(this.addRmRecorded == true) {
      this.apiService.getTypeQuestionRM()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (res: TypeQuestionRM[]) => {
          for(let i = 0; i < res.length; i++) {
            if(res[i].id == this.typeQuestionRM.id) {
              this.answersUpdate = []
              this.typeQuestionRM.typeQuestion.answers.forEach((element: Answers) => {
              this.answersUpdate.push(element.answer)
              });
            }
          }
        }
      })
    }
  }

  getTopics() {
    this.apiService.getTopics()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Topics[]) => {
        this.topics = res;
        if(this.topics.length != 0) {
          for(let i = 0; i < this.topics.length; i++) {
            this.answersUpdate.push(this.topics[i]?.topic) 
          }
        }
      }
    })
  }

  juntar(): string {
    return this.answersUpdate.join('\n');
  }
  
  update() {
    this.data = this.answersFront.split('\n');
    console.log('data',this.data);
    if(!this.addRmRecorded == true && !this.addRuRecorded && !this.addGridRecorded) {
      if(this.answersTopicsBool) {
        for(let i = 0; i < this.data.length; i++) {
          let answer = {id: this.answers[i].id, answer: this.data[i], selected: this.answers[i].selected}
          this.apiService.editAnswers(answer).subscribe({
            next: (res: Answers) => console.log('res: ',res)
          })  
        }
      } else {
        for(let i = 0; i < this.data.length; i++) {
          if(this.topics.length != 0) {
            let topics = {id: this.topics[i].id, topic: this.data[i], selectedTopics: this.topics[i].selectedTopics}
            this.apiService.editTopics(topics).subscribe({
              next: (res: Topics) => console.log('res: ',res)
            })
          }  
        }
      }
    }
    
    if(this.addRuRecorded == true) {
      this.data = this.answersFront.split('\n');
      this.typeQuestion.typeQuestion.answers = []
      this.typeQuestion.typeQuestion.answers.push({id: 1, answer: this.data[0], selected: false});
      this.typeQuestion.typeQuestion.answers.push({id: 2, answer: this.data[1], selected: false});
      this.apiService.editTypeQuestion(this.typeQuestion).subscribe()
      window.location.reload();
    }

    if(this.addRmRecorded == true) {
      this.data = this.answersFront.split('\n');
      this.typeQuestionRM.typeQuestion.answers = []
      this.typeQuestionRM.typeQuestion.answers.push({id: 1, answer: this.data[0], selected: false});
      this.typeQuestionRM.typeQuestion.answers.push({id: 2, answer: this.data[1], selected: false});
      this.apiService.editTypeQuestionRM(this.typeQuestionRM).subscribe()
      window.location.reload();
    }

    if(this.addGridRecorded == true) {
      this.data = this.answersFront.split('\n');
      this.typeQuestion2.typeQuestion.answers = []
      this.typeQuestion2.typeQuestion.answers.push({id: 1, answer: this.data[0], selected: false});
      this.typeQuestion2.typeQuestion.answers.push({id: 2, answer: this.data[1], selected: false});
      this.typeQuestion2.typeQuestion.answers.push({id: 3, answer: this.data[2], selected: false});
      this.apiService.editTypeQuestion2(this.typeQuestion2).subscribe()
      window.location.reload();
    }

    if(this.gridTopicsBool == true) {
      this.data = this.answersFront.split('\n');
      this.typeQuestion2.typeQuestion.topics = []
      this.typeQuestion2.typeQuestion.topics.push({id: 1, topic: this.data[0], selectedTopics: false});
      this.typeQuestion2.typeQuestion.topics.push({id: 2, topic: this.data[1], selectedTopics: false});
      this.typeQuestion2.typeQuestion.topics.push({id: 3, topic: this.data[2], selectedTopics: false});
      this.apiService.editTypeQuestion2(this.typeQuestion2).subscribe()
      window.location.reload();
    }

    this.storeService.setRouterAnswer(true);
    this.storeService.setRuBool(false);
    window.location.reload();
    this.closeComponent();
    
  }

  getRuRecordedMethod() {
    this.storeService.getRuRecorded().subscribe({
      next: (res: TypeQuestion) => {
        this.typeQuestion = res;
        console.log(this.typeQuestion)
      }
    }); 
  }

  getRmRecordedMethod() {
    this.storeService.getRmRecorded().subscribe(
      {
        next: (res: TypeQuestionRM) => {
          this.typeQuestionRM = res;
          console.log(this.typeQuestionRM)
        }
      }
    );
  }

  getGridRecordedMethod() {
    this.storeService.getGridRecorded().subscribe(
      {
        next: (res: TypeQuestion2) => {
          this.typeQuestion2 = res;
          console.log(this.typeQuestion2);
        }
      }
    );
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}
