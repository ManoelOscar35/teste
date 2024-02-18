import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAnswersComponent } from '../add-answers/add-answers.component';
import { MultiUpdComponent } from '../multi-upd/multi-upd.component';
import { EditanswersComponent } from '../editanswers/editanswers.component';
import { Answers } from '../models/answers';
import { Subject, delay, map, take, takeUntil } from 'rxjs';
import { TypeQuestion } from '../models/typeQuestion';
import { TypeQuestion2 } from '../models/typeQuestion2';
import { Router } from '@angular/router';
import { TypeQuestionRM } from '../models/typeQuestionRM';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit, OnDestroy {

  answerContainerBool!: boolean;
  answers!: Answers[];
  unsubscribe$: Subject<any> = new Subject<any>();
  answersBool!: boolean;
  answersBool2!: boolean;
  topicsBool!: boolean;
  addRuRecorded!: boolean;
  addRmRecorded!: boolean;
  addGridRecorded!: boolean;
  rmBool!: boolean;
  rmBoolRecorded!: boolean;
  typeQuestion2: TypeQuestion2[] = [];
  typeQuestion: TypeQuestion[] = [];
  typeQuestionRM: TypeQuestionRM[] = [];
  myQuestion!: string;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private dialog: MatDialog,
    private router: Router
  )
  {}

  ngOnInit() {
    this.storeService.getMyQuestion()
      .subscribe({
        next: (res: string) => {
          console.log(res)
          this.myQuestion = res
          console.log(this.myQuestion)
        } 
      });
    
    
    this.storeService.setGridTopicsBool(false);

    this.storeService.getAddRuRecordedBool().subscribe({
      next: (res: boolean) => {
        this.addRuRecorded = res
        console.log(this.addRuRecorded)
      }
    });

    this.storeService.getAddRmRecordedBool().subscribe({
      next: (res: boolean) => {
        this.addRmRecorded = res
        console.log(this.addRmRecorded)
      }
    });

    this.storeService.getAddGridRecordedBool().subscribe({
      next: (res: boolean) => {
        this.addGridRecorded = res
        console.log(this.addGridRecorded)
      }
    });

    if(!this.addRuRecorded && !this.addRmRecorded && !this.addGridRecorded) {
      this.storeService.setAnswersTopicsBool(true);
      this.storeService.setAnswersDeleteBool(true);
    } 

    this.apiService.getTypeQuestion2()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: TypeQuestion2[]) => {
        this.typeQuestion2 = res
      }
    });

    this.apiService.getTypeQuestionRM()
    .pipe(
      takeUntil(this.unsubscribe$),
    )
    .subscribe({
      next: (res: TypeQuestionRM[]) => {
        this.typeQuestionRM = res,
        console.log(this.typeQuestionRM)
      }
    })

    this.getAnswers();

    this.storeService.getRMBool().subscribe({
      next: (res: boolean) => { 
        console.log(res)
        this.rmBool = res
        console.log('depois',this.rmBool)
      }
    });

    this.apiService.getTypeQuestion()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: TypeQuestion[]) => {
        this.typeQuestion = res,
        console.log(this.typeQuestion)

        if(this.rmBool == true) {
          this.typeQuestionRM.forEach((res: TypeQuestionRM) => {
            if(res.typeQuestion.question == '') {
              this.apiService.editTypeQuestionRM({id: res.id, typeQuestion: {typeQuestion: res.typeQuestion.typeQuestion ,question: this.myQuestion, answers: []}}).subscribe()
            }
          })
        } else {
          this.typeQuestion.forEach((res: TypeQuestion) => {
            if(res.typeQuestion.question == '') {
              this.apiService.editTypeQuestion({id: res.id, typeQuestion: {typeQuestion: res.typeQuestion.typeQuestion ,question: this.myQuestion, answers: []}}).subscribe()
              this.storeService.setMyQuestion(this.myQuestion);
            }
          })
        }
      }
    })
  }

  getAnswersBool() {
    this.storeService.getAnswersBool()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: boolean) => {
        this.answersBool  = res;
        console.log(this.answersBool)
        if(this.answersBool == true) {
          this.storeService.setTopicsBool(false);
          this.storeService.setRMBoolRecorded(false);
        }
        
      } 
    }); 
  }

  getTopicsBool() {
    this.storeService.getTopicsBool()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: boolean) => {
        this.topicsBool = res;
        console.log(this.topicsBool)
        if(this.topicsBool == true) {
          this.storeService.setAnswersBool(false);
          this.storeService.setRMBoolRecorded(false);
        }  
      } 
    });
  }

  getRMBoolRecorded() {
    this.storeService.getRMBoolRecorded()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: boolean) => {
        this.rmBoolRecorded = res // pra habilitar ou desabilitar o layout do objeto rm
        console.log(this.rmBoolRecorded)
        if(this.rmBoolRecorded == true) {
          this.storeService.setTopicsBool(false);
          this.storeService.setAnswersBool(false);
        }
      } 
    });
  }

  layoutMethod(event: any) {
    let select = (event.target as HTMLSelectElement).value;
    console.log(select)
    //Enviando dado pro BehaviorSubject
    this.storeService.setAnswersLayout(select)
  }

  //Obter as respostas do servidor
  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        console.log('126 -> ', this.answers)
        this.answers = res;
        if(this.answers.length == 0) {
          this.answersBool2 = false;
          this.getAnswersBool();
          this.getTopicsBool();
          this.getRMBoolRecorded();
        } else {
          this.answersBool2 = true;
          this.topicsBool = false;
          this.answersBool = false;
          this.rmBoolRecorded = false;
        }

        console.log(this.myQuestion)
        
        // Ordenar os itens pelo ID atual
        res.sort((a, b) => a.id - b.id);
      
        // Atualizar os IDs sequencialmente
        for (let i = 0; i < res.length; i++) {
          res[i].id = i + 1;
        }

       this.answers = res;
       
      }
    });
  }

  // setAnswersRecorded() {
  //   this.storeService.getRuRecorded().subscribe({
  //     next: (res: boolean) => {
  //       if(res == true) {
  //         this.storeService.getTypeQuestionRU().subscribe({
  //           next: (res: TypeQuestion) => {
  //             this.answers = res?.typeQuestion.answers
  //           }
  //         });
  //       }
  //     }
  //   });
  // }

  openDialog() {
    this.dialog.open(AddAnswersComponent, {
      width: '1000px',
      autoFocus: false,
      height: '600px',
      data: {
        
      }
    })

    
  }

  openDialogMultiUpd() {
    this.dialog.open(MultiUpdComponent, {
      width: '1000px',
      autoFocus: false,
      height: '600px',
      data: {
        
      }
    })

    
  }

  openDialogEdit() {
    this.dialog.open(EditanswersComponent, {
      width: '1000px',
      autoFocus: false,
      height: '600px',
      data: {

      }
    })
  }

  selectAnswer(answer: any) {
    answer.selected = !answer.selected;
    console.log(answer)
    this.storeService.setAnswers(answer.answer); // Enviar a resposta pro componente Edit
    this.storeService.setBotaoExcluir(answer.id); //Envia id para o BehaviorSubject
  }

  trackByFn(index: number, answer: any): number {
    return answer.id;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}

 

 



 

