import { Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { TypeQuestion } from '../models/typeQuestion';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Answers } from '../models/answers';
import { Topics } from '../models/topics';
import { Router } from '@angular/router';
import { TypeQuestion2 } from '../models/typeQuestion2';
import { TypeQuestionRM } from '../models/typeQuestionRM';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

 
  singleChoice!: string;
  multipleSelection!: string;
  singleChoiceGrid: string = "";
  gridBool!: boolean;
  gridBool2!: boolean;
  barraBool!: boolean;
  ruBool!: boolean;
  ruBool2!: boolean;
  rmBool!: boolean;
  rmBool2!: boolean;
  answers!: Answers[];
  answer1: string = '';
  answer2: string = '';

  answerTypeQuestion1: string = "";
  answerTypeQuestion2: string = "";
  topicTypeQuestion1: any;
  topicTypeQuestion2: any;
  question: any;
  answersLayout!: string;
  data!: TypeQuestion[];
  data2!: TypeQuestion2[];
  dataRM!: TypeQuestionRM[];
  questionInput: boolean = false;
  routerAnswerBool: boolean = false;
  myQuestion: any;
  answersTypeQuestion: any[] = [];
  dados1$!: Observable<any>;
  dados2$!: Observable<any>;

  topics!: Topics[];
  topic1!: string;
  topic2!: string;
  topic3!: string;
  indexTopicBool!: boolean;
  topicBool!: boolean;
  selectBoxBool!: boolean;

  corDeFundoQuestion: string = '#f5f5ef';
  corDeFundoAnswer: string = '#f5f5ef';
  corDeFundoTopics: string = '#f5f5ef';
  cor: string = '';
  colorAnswer1: string = '';
  colorAnswer2: string = '';

  unsubscribe$: Subject<any> = new Subject<any>();

  selectBox: string = "selectBox";
  checkbox: string = "checkbox";
  radio: string = "radio";
  selecionar: string = "selecionar";
  caixa: string = "caixa";
  links: string = "links";
  normal: string = "normal";
  

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.getAnswers();

    this.getTypeQuestion();
    
    this.getTypeQuestion2();

    this.getTypeQuestionRM();

    this.getTopics();

    this.storeService.getRuBool2()
    .pipe(
      take(1)
    )
    .subscribe({
      next: (res: any) =>  {
        this.ruBool2 = res
        console.log(this.ruBool2)
       }
      
    });

    this.storeService.getRouterAnswer()
    .pipe(
      take(1)
    )
    .subscribe({
      next: (res: boolean) => this.routerAnswerBool = res
    });

    //Obtendo dado do BehaviorSubject
    this.storeService.getAnswersLayout()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: string) => {
        this.answersLayout = res
        console.log(this.answersLayout)
        if(this.answersLayout == this.selectBox) {
          this.selectBoxBool = true
        }

      }
    });

    if(this.answersLayout == 'checkbox') {
      this.ruBool = false;
      this.ruBool2 = false;
      this.rmBool = false;
      this.rmBool2 = true;
    } 

    if(this.answersLayout == 'radio') {
      this.ruBool = false;
      this.ruBool2 = false;
      this.rmBool = false;
    } 

    // if(this.answersLayout == 'radio' && this.ruBool2 == true) {
    //   this.ruBool = false;
    //   this.ruBool2 = true;
      
    // } 

    this.storeService.getColorAnswers2().subscribe({
      next: (res: string) => this.cor = res
    });

    this.storeService.getColorAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: string) => {
        if(res === this.answer1) {
          this.colorAnswer1 = this.cor;
          this.colorAnswer2 = 'black';
        } 
        if(res === this.answer2) {
          this.colorAnswer2 = this.cor;
          this.colorAnswer1 = 'black';
        }

        if(res === this.answerTypeQuestion1) {
          this.colorAnswer1 = 'red';
          this.colorAnswer2 = 'black';
        }

        if(res === this.answerTypeQuestion2) {
          this.colorAnswer2 = 'red';
          this.colorAnswer1 = 'black';
        }
      }
    }); 
    
    const valorArmazenado = localStorage.getItem('question');

    if (valorArmazenado) {
      this.myQuestion = valorArmazenado;
      this.storeService.setMyQuestion(this.myQuestion);
      this.storeService.setMyQuestion2(valorArmazenado);
      
    }

     console.log(this.gridBool)
  }


  setGrid() {
    this.storeService.setGridBool(true);
    this.storeService.setRuBool(false);
    this.storeService.setAnswersBool(false);
    this.storeService.setRMBool(false);
    this.storeService.setRMBoolRecorded(false);
    this.storeService.setTopicsBool(true);
    this.barraBool = false;
    this.gridBool = false;
    this.rmBool2 = false;
    this.ruBool = false;
    this.ruBool2 = false;
    this.gridBool2 = true;
    this.topicBool = true;
    this.storeService.setTopicBool(true);
   
    this.singleChoiceGrid = 'Grid';
    this.myQuestion = "";
    localStorage.removeItem('question')
    this.gridBool2 = false;
    this.apiService.postTypeQuestion2({typeQuestion: {typeQuestion:  this.singleChoiceGrid, question: "", answers: [], topics: []}}).pipe(take(1)).subscribe({
      next: (res: TypeQuestion2) => {
        this.getTypeQuestion2();  
        
      }
    })

    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).pipe(take(1)).subscribe();
      
    });

    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).pipe(take(1)).subscribe();
      
    });

    
    
  }

  

  //Obtendo os dados do servidor
  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      take(1)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.answers = res;
        this.colorAnswer1 = 'black';
        this.colorAnswer2 = 'black';
        this.answer1 = res[0]?.answer
        this.answer2 = res[1]?.answer
        
        if(this.answers.length == 0) {
          this.ruBool = false;
          this.ruBool2 = false;
          this.myQuestion = '';
          this.rmBool2 = false;
          this.rmBool = false;
          this.gridBool = false;
          this.gridBool2 = false;
          this.storeService.getRuBool2().subscribe({
            next: (res: boolean) => {
              this.ruBool2 = res;
            }
          });
        } else if (this.answers.length == 2) {
          this.storeService.getGridBool().subscribe({
            next: (res: boolean) => {
              this.gridBool2 = res;
              this.gridBool = false;
              this.ruBool2 = false;
              this.rmBool2 = false; 
              this.ruBool = false;
            }  
          })

          this.storeService.getRuBool().subscribe({
            next: (res: boolean) => {
              console.log(res)
              if(res == true) {
                this.ruBool2 = true;
                this.ruBool = true;
                this.answersLayout = 'radio'
              }
              console.log(this.ruBool2)
              this.ruBool2 = res;
              this.ruBool = false;
            }
          });
        } else if(this.answers.length > 2) {
          this.gridBool2 = true;
          this.gridBool = false;
          this.rmBool2 = false;
          this.rmBool = false;
          this.ruBool = false;
          this.ruBool2 = false;
          this.topicBool = true;
        }
      }
    })
  }

   //Obtendo os dados do servidor
   getTopics() {
    this.apiService.getTopics()
    .pipe(
      take(1)
    )
    .subscribe({
      next: (res: Topics[]) => {
        this.topics = res;
        this.topic1 = this.topics[0]?.topic;
        this.topic2 = this.topics[1]?.topic; 
        this.topic3 = this.topics[2]?.topic;
        this.indexTopicBool = this.topics[0]?.id;
        this.gridBool2 = true;
        
        if(this.topics.length == 0) {
          this.gridBool = false;
          this.gridBool2 = false;
          
        } 
      }
    })
  }

  typeQuestion() {
    this.storeService.setAddRuRecordedBool(false);
    this.storeService.setGridBool(false);
    this.storeService.setRuBool(false);
    this.storeService.setRMBool(false);
    this.storeService.setTopicsBool(false);
    this.ruBool = false;
    this.ruBool2 = false;
    this.rmBool = false;
    this.rmBool2 = false
    this.topicBool = false;
    this.singleChoice = 'RU';
    this.myQuestion = ""
    localStorage.removeItem('question')
    this.gridBool = false;
    this.gridBool2 = false;
    // this.storeService.setRuBool(true);
    console.log(this.ruBool)
    this.apiService.postTypeQuestion({typeQuestion: {typeQuestion:  this.singleChoice, question: ''}}).subscribe({
      next: (res: TypeQuestion) => {
        this.getTypeQuestion();
        
      }
    });
    
    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).pipe(take(1)).subscribe();
    });

    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).pipe(take(1)).subscribe();
    });

    // this.questionBool = true;
  }

  typeQuestionRM() {
    this.storeService.setGridBool(true);
    this.storeService.setRuBool(false);
    this.storeService.setRMBool(true);
    this.storeService.setRMBoolRecorded(true);
    this.storeService.setAnswersBool(false);
    this.storeService.setTopicsBool(false);
    // this.barraBool = false;
    this.topicBool = false;
    this.multipleSelection = 'RM';
    this.myQuestion = ""
    localStorage.removeItem('question')
   
    // this.storeService.setRuBool(true);
    console.log(this.ruBool)
    this.apiService.postTypeQuestionRM({typeQuestion: {typeQuestion:  this.multipleSelection, question: ''}}).pipe(take(1)).subscribe({
      next: (res: TypeQuestionRM) => {
        this.getTypeQuestionRM();
        
      }
    });

    
    this.gridBool = false;
    this.gridBool2 = false;
    this.ruBool2 = false;
    this.ruBool = false;
    
    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).pipe(take(1)).subscribe();
    });

    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).pipe(take(1)).subscribe();
    });

  }

  setQuestion(d: TypeQuestion) {
    this.storeService.setAddRuRecordedBool(true);
    this.storeService.setAddRmRecordedBool(false);
    this.storeService.setAddGridRecordedBool(false);
    this.storeService.setRuRecorded(d);
    this.storeService.setAnswersBool(true);
    this.storeService.setTopicsBool(false);
    this.storeService.setRMBoolRecorded(false);
    this.storeService.setDeleteRuRecordedBool(true);
    this.onModelChange();
    this.myQuestion = d.typeQuestion.question;
    console.log(this.myQuestion)
    this.storeService.setMyQuestion(this.myQuestion);
    this.ruBool = false
    this.barraBool = false;
    this.ruBool2 = true;
    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).pipe(take(1)).subscribe()
    });
    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).pipe(take(1)).subscribe()
    });
    this.answerTypeQuestion1 = d.typeQuestion.answers[0]?.answer;
    this.answerTypeQuestion2 = d.typeQuestion.answers[1]?.answer;

    this.answersLayout = 'radio'

    // this.storeService.setRuRecorded(true);
    // this.storeService.setTypeQuestionRU(d);
    
    console.log(this.answerTypeQuestion1)
    this.gridBool = false;
    this.gridBool2 = false;
    this.topicBool = false;
    this.rmBool2 = false;
    
    
    // this.storeService.setRMBool();
    // this.getTypeQuestion();
  }

  setQuestion2(d: TypeQuestion2) {
    this.onModelChange();
    this.myQuestion = d.typeQuestion.question;
    console.log(this.myQuestion)
    this.storeService.setMyQuestion(this.myQuestion)
    localStorage.setItem('question', this.myQuestion);
    this.storeService.setGridBool(true);
    this.storeService.setRMBool(false);
    this.storeService.setTopicsBool(true);
    this.storeService.setAnswersBool(false);
    this.storeService.setRMBoolRecorded(false);
    this.storeService.setAddGridRecordedBool(true);
    this.storeService.setAddRuRecordedBool(false);
    this.storeService.setAddRmRecordedBool(false);
    this.storeService.setGridRecorded(d);
    this.storeService.setDeleteGridRecordedBool(true);
    
    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).pipe(take(1)).subscribe()
    });
   
    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).pipe(take(1)).subscribe()
    });
    
    
    this.topicTypeQuestion1 = d.typeQuestion.answers[0]?.answer;
    this.topicTypeQuestion2 = d.typeQuestion.answers[1]?.answer;
    console.log(this.answerTypeQuestion1)
    this.ruBool2 = false;
    this.ruBool = false;
    this.gridBool2 = true;
    this.gridBool = false;
    this.barraBool = false;
    this.topicBool = true;
    this.rmBool = false;
    this.rmBool2 = false;

  }

  setQuestionRM(d: TypeQuestionRM) {
    this.answer1 = d.typeQuestion.answers[0]?.answer;
    this.answer2 = d.typeQuestion.answers[1]?.answer;
    this.storeService.setAddRmRecordedBool(true);
    this.storeService.setAddRuRecordedBool(false);
    this.storeService.setAddGridRecordedBool(false);
    this.storeService.setRmRecorded(d);
    this.storeService.setRMBool(true);
    this.onModelChange();
    this.myQuestion = d.typeQuestion.question;
    console.log(this.myQuestion)
    this.storeService.setMyQuestion(this.myQuestion)
    localStorage.setItem('question', this.myQuestion);
    // this.storeService.setRuBool(false);
    this.storeService.setRMBoolRecorded(true);
    this.storeService.setTopicsBool(false);
    this.storeService.setAnswersBool(false);
    this.storeService.setDeleteRmRecordedBool(true);
    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).pipe(take(1)).subscribe()
    });
   
    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).pipe(take(1)).subscribe()
    });
    
    
    this.topicTypeQuestion1 = d.typeQuestion.answers[0]?.answer;
    this.topicTypeQuestion2 = d.typeQuestion.answers[1]?.answer;
    console.log(this.answerTypeQuestion1)
    this.rmBool2 = true;
    this.ruBool2 = false;
    this.ruBool = false;
    this.gridBool2 = false;
    this.gridBool = false;
    this.barraBool = false;
    this.topicBool = false;

    this.answersLayout = 'checkbox';


  }

  getTypeQuestion() {
    //Obtendo os dados do servidor
    this.apiService.getTypeQuestion()
    .pipe(
      take(1)
    )
    .subscribe({
      next: (res: TypeQuestion[]) => {
        this.colorAnswer1 = 'black';
        this.colorAnswer2 = 'black';
        this.data = res;
        console.log("getTypeQuestion: ",this.data)
        this.data.forEach((d) => {
          let question;
          question = localStorage.getItem('question');
          // console.log('question-> ', question)
          if(d.typeQuestion.question == question) {
            this.myQuestion = d.typeQuestion.question
          }
        });

      }
    })
  }

  getTypeQuestionRM() {
    //Obtendo os dados do servidor
    this.apiService.getTypeQuestionRM()
    .pipe(
      takeUntil(this.unsubscribe$),
      
    )
    .subscribe({
      next: (res: TypeQuestionRM[]) => {
        this.colorAnswer1 = 'black';
        this.colorAnswer2 = 'black';
        this.dataRM = res;
        console.log("getTypeQuestionRM: ",this.dataRM)
        this.dataRM.forEach((d) => {
          let question;
          question = localStorage.getItem('question');
          // console.log('question-> ', question)
          if(d.typeQuestion.question == question) {
            this.myQuestion = d.typeQuestion.question
          }
        });

        this.answersLayout = 'checkbox'

        if(this.answers.length == 0) {
          this.rmBool2 = false;
          this.rmBool = false;
          this.ruBool = false;
          this.ruBool2 = false;
          this.gridBool = false;
          this.gridBool2 = false;
          this.answersLayout = '';
        } else {
          this.storeService.getRMBool().subscribe({
            next: (res: boolean) =>{
              this.rmBool2 = false;
              this.rmBool = false;
              this.ruBool = false;
              this.ruBool2 = false;
              this.gridBool = false;
              this.gridBool2 = false;
            } 
          })

          this.storeService.getGridBool().subscribe({
            next: (res: boolean) => {
              this.gridBool2 = res;
              this.ruBool2 = false;
              this.ruBool = false;
              this.rmBool2 = false; 
            }  
          })

          this.storeService.getRuBool().subscribe({
            next: (res: boolean) => {
              console.log(res)
              if(res == true) {
                this.ruBool2 = false;
                this.ruBool = false;
              }
              
            }
          });
        }
      
        if(this.answers.length > 2) {
          this.gridBool2 = true;
          this.gridBool = false;
          this.rmBool2 = false;
          this.rmBool = false;
          this.ruBool = false;
          this.ruBool2 = false;
          this.topicBool = true;
        }
      }
    })
  }

  getTypeQuestion2() {
    //Obtendo os dados do servidor
    this.apiService.getTypeQuestion2()
    .pipe(
      takeUntil(this.unsubscribe$),
      take(1)
    )
    .subscribe({
      next: (res: TypeQuestion2[]) => {
        this.data2 = res;

      }
    })
  }

  onModelChange() {
    localStorage.setItem('question', this.myQuestion);
    console.log(this.myQuestion)
    this.storeService.setMyQuestion(this.myQuestion);
  }

  changeColorMethodQuestion() {
    this.corDeFundoQuestion = 'gray';
    this.corDeFundoAnswer = '#f5f5ef';
    this.corDeFundoTopics = '#f5f5ef';
    this.questionInput = true;

  }

  changeColorMethodAnswer() {
    this.corDeFundoAnswer = 'gray';
    this.corDeFundoQuestion = '#f5f5ef';
    this.corDeFundoTopics = '#f5f5ef';
    this.questionInput = false;
    
    
  }

  changeColorMethodTopics() {
    this.corDeFundoTopics = 'gray';
    this.corDeFundoQuestion = '#f5f5ef';
    this.corDeFundoAnswer = '#f5f5ef';
    this.questionInput = false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}
