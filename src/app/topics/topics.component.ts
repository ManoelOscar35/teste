import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EditanswersComponent } from '../editanswers/editanswers.component';
import { MultiUpdComponent } from '../multi-upd/multi-upd.component';
import { AddAnswersComponent } from '../add-answers/add-answers.component';
import { Subject, takeUntil } from 'rxjs';
import { Topics } from '../models/topics';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { MatDialog } from '@angular/material/dialog';
import { TypeQuestion2 } from '../models/typeQuestion2';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit, OnDestroy {

  topics!: Topics[];
  typeQuestion2!: TypeQuestion2[];
  topicsBool!: boolean;
  topicsBool2!: boolean;
  myQuestion!: string;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private dialog: MatDialog
  )
  {}

  ngOnInit() {
    this.storeService.setGridBool(true);
    this.storeService.setAnswersTopicsBool(false);
    this.storeService.setAnswersDeleteBool(false);
    this.storeService.setGridTopicsBool(true);
    this.storeService.setAddGridRecordedBool(false);
    this.storeService.setDeleteGridTopicRecordedBool(true);

    this.getTopics();

  
    this.storeService.getAnswersBool()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: boolean) => {
        console.log(res)
        this.topicsBool  = !res;
        if(!res == true) {
          this.topicsBool2 = false;
          
        }
      } 
    });

    this.apiService.getTypeQuestion2()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: TypeQuestion2[]) => {
        this.typeQuestion2 = res,
        console.log(this.typeQuestion2)
      }
    })

    this.storeService.getMyQuestion()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: string) => {
        console.log(res),
        this.myQuestion = res
      } 
    });

     

    
  }

  layoutMethod(event: any) {
    let select = (event.target as HTMLSelectElement).value;
    console.log(select)
    //Enviando dado pro BehaviorSubject
    this.storeService.setAnswersLayout(select);
  }

  //Obter as respostas do servidor
  getTopics() {
    this.apiService.getTopics()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Topics[]) => {
        this.topics = res;

        if(this.topics.length != 0) {
          this.topicsBool2 = true;
          this.topicsBool = false;
        } else {
          this.topicsBool2 = false;
          this.topicsBool = true;
          this.storeService.setTopicBool(true);
        }
        
       
        // Ordenar os itens pelo ID atual
        res.sort((a, b) => a.id - b.id);
      
        // Atualizar os IDs sequencialmente
        for (let i = 0; i < res.length; i++) {
          res[i].id = i + 1;
        }

        this.storeService.setRuBool(false);
      }
    });
  }

  

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

  selectTopic(topic: any) {
    topic.selectedTopics = !topic.selectedTopics;
    this.storeService.setBotaoExcluir(topic.id)
  }

  trackByFn(index: number, topic: any): number {
    return topic.id;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}
