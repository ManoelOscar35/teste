import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Answers } from '../models/answers';
import { TypeQuestion } from '../models/typeQuestion';
import { TypeQuestionRM } from '../models/typeQuestionRM';
import { TypeQuestion2 } from './../models/typeQuestion2';
import { Topics } from '../models/topics';

@Component({
  selector: 'app-botao-excluir',
  templateUrl: './botao-excluir.component.html',
  styleUrls: ['./botao-excluir.component.css']
})
export class BotaoExcluirComponent implements OnInit {

  id!: number;
  deleteBool!: boolean;
  deleteRuRecordedBool!: boolean;
  deleteRmRecordedBool!: boolean;
  deleteGridRecordedBool!: boolean;
  deleteGridTopicRecordedBool!: boolean;
  typeQuestion!: TypeQuestion;
  typeQuestion2!: TypeQuestion2;
  typeQuestionRm!: TypeQuestionRM;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.storeService.getDeleteRuRecordedBool().subscribe({
      next: (res: boolean) => {
        this.deleteRuRecordedBool = res
        console.log(this.deleteRuRecordedBool);
      }
    });

    this.storeService.getDeleteRmRecordedBool().subscribe({
      next: (res: boolean) => {
        this.deleteRmRecordedBool = res
        console.log(this.deleteRmRecordedBool);
      }
    });

    this.storeService.getDeleteGridRecordedBool().subscribe({
      next: (res: boolean) => {
        this.deleteGridRecordedBool = res
        console.log(this.deleteGridRecordedBool);
      }
    });

    if(!this.deleteRuRecordedBool && !this.deleteRmRecordedBool && !this.deleteGridRecordedBool) {
      this.storeService.getAnswersDeleteBool().subscribe({
        next: (res: boolean) => this.deleteBool = res 
      });
    }

    console.log(this.deleteBool)

    this.storeService.getDeleteGridTopicRecordedBool().subscribe({
      next: (res: boolean) => {
        this.deleteGridTopicRecordedBool = res
        if( this.deleteGridTopicRecordedBool == true) {
          this.deleteGridRecordedBool = false
        }
      }
    });

    this.storeService.getRuRecorded().subscribe({
      next: (res: TypeQuestion) => {
        this.typeQuestion = res
        console.log(this.typeQuestion)
      }
    }); 

    this.storeService.getRmRecorded().subscribe({
      next: (res: TypeQuestionRM) => {
        this.typeQuestionRm = res
        console.log(this.typeQuestionRm)
      }
    }); 

    this.storeService.getGridRecorded().subscribe({
      next: (res: TypeQuestion2) => {
        this.typeQuestion2 = res
        console.log(this.typeQuestion2)
      }
    }); 
  }



  delete() {
    //Obtem id
    this.storeService.getBotaoExcluir().subscribe({
      next: (res: number) =>  {
        if(res == 1 || res == 2 || res == 3) {
          this.id = res
          console.log(this.id)
        }
      }
    })

    if(!this.deleteRuRecordedBool && !this.deleteRmRecordedBool && !this.deleteGridRecordedBool &&  this.deleteGridTopicRecordedBool) {
      if(this.deleteBool == true && !this.deleteRuRecordedBool &&  !this.deleteRmRecordedBool &&  !this.deleteGridRecordedBool &&  this.deleteGridTopicRecordedBool) {
        //Deleta dado do servidor
        this.apiService.deleteAnswers(this.id).subscribe({
          next: (res: any) => {
            this.storeService.setRouterAnswer(true)
            this.storeService.setRuBool2(false)
            
            window.location.reload();
            
          this.storeService.setAnswersDeleteBool(true);
            
            // this.storeService.setAnswerContainerBool(true);
          }
        });
      } else {
        //Deleta dado do servidor
        this.apiService.deleteTopics(this.id).subscribe({
          next: (res: any) => {
            // this.storeService.setRouterAnswer(true);
            // this.storeService.setRuBool2(false);
            window.location.reload();

            
          this.storeService.setAnswersDeleteBool(false);
          }
        });
      }
    }

    if(this.deleteRuRecordedBool == true) {
      this.apiService.getTypeQuestion().subscribe({
        next: (res: TypeQuestion[]) => {
          for(let i = 0; i < res.length; i++) {
            if(res[i].id == this.typeQuestion.id) {
              if(this.typeQuestion.typeQuestion.answers[0].id == this.id) {
                this.typeQuestion.typeQuestion.answers = this.typeQuestion.typeQuestion.answers.filter((el: Answers) => el !== this.typeQuestion.typeQuestion.answers[0]);

                // Ordenar os itens pelo ID atual
                this.typeQuestion.typeQuestion.answers.sort((a: any, b: any) => a.id - b.id);
    
                // Atualizar os IDs sequencialmente
                for (let i = 0; i < this.typeQuestion.typeQuestion.answers.length; i++) {
                  this.typeQuestion.typeQuestion.answers[i].id = i + 1;
                }

                this.apiService.editTypeQuestion(this.typeQuestion).subscribe();
              }
            }
          }
          console.log(res)
        } 
      });

    }

    if(this.deleteRmRecordedBool == true) {
      this.apiService.getTypeQuestionRM().subscribe({
        next: (res: TypeQuestionRM[]) => {
          for(let i = 0; i < res.length; i++) {
            if(res[i].id == this.typeQuestionRm.id) {
              if(this.typeQuestionRm.typeQuestion.answers[i].id == this.id) {
                this.typeQuestionRm.typeQuestion.answers = this.typeQuestionRm.typeQuestion.answers.filter((el: Answers) => el !== this.typeQuestionRm.typeQuestion.answers[i]);

                // Ordenar os itens pelo ID atual
                this.typeQuestionRm.typeQuestion.answers.sort((a: any, b: any) => a.id - b.id);
    
                // Atualizar os IDs sequencialmente
                for (let i = 0; i < this.typeQuestionRm.typeQuestion.answers.length; i++) {
                  this.typeQuestionRm.typeQuestion.answers[i].id = i + 1;
                }

                this.apiService.editTypeQuestionRM(this.typeQuestionRm).subscribe();
                
              }
            }
          }
          console.log(res)
        } 
      });
    }

    if(this.deleteGridRecordedBool == true && !this.deleteGridTopicRecordedBool ) {
      this.apiService.getTypeQuestion2().subscribe({
        next: (res: TypeQuestion2[]) => {
          for(let i = 0; i < res.length; i++) {
            if(res[i].id == this.typeQuestion2.id) {
                if(this.typeQuestion2.typeQuestion.answers[0].id == this.id) {
                  
                  this.typeQuestion2.typeQuestion.answers = this.typeQuestion2.typeQuestion.answers.filter((obj: Answers) => obj !== this.typeQuestion2.typeQuestion.answers[0]);

                  // // Ordenar os itens pelo ID atual
                  this.typeQuestion2.typeQuestion.answers.sort((a: any, b: any) => a.id - b.id);
      
                  // // Atualizar os IDs sequencialmente
                  for (let i = 0; i < this.typeQuestion2.typeQuestion.answers.length; i++) {
                    this.typeQuestion2.typeQuestion.answers[i].id = i + 1;
                  }

                  this.apiService.editTypeQuestion2(this.typeQuestion2).subscribe();
                }
            }
          }
          console.log(res)
        } 
      });
    }

    if(this.deleteGridTopicRecordedBool == true) {
      console.log(this.deleteGridRecordedBool)
      this.apiService.getTypeQuestion2().subscribe({
        next: (res: TypeQuestion2[]) => {
          for(let i = 0; i < res.length; i++) {
            if(res[i].id == this.typeQuestion2.id) {
                if(this.typeQuestion2.typeQuestion.topics[0].id == this.id) {
                  
                  this.typeQuestion2.typeQuestion.topics = this.typeQuestion2.typeQuestion.topics.filter((obj: Topics) => obj !== this.typeQuestion2.typeQuestion.topics[0]);

                  // // Ordenar os itens pelo ID atual
                  this.typeQuestion2.typeQuestion.topics.sort((a: any, b: any) => a.id - b.id);
      
                  // // Atualizar os IDs sequencialmente
                  for (let i = 0; i < this.typeQuestion2.typeQuestion.topics.length; i++) {
                    this.typeQuestion2.typeQuestion.topics[i].id = i + 1;
                  }

                  this.apiService.editTypeQuestion2(this.typeQuestion2).subscribe();
                }
            }
          }
          console.log(res)
        } 
      });
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
