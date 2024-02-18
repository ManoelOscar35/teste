import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TypeQuestion } from '../models/typeQuestion';
import { TypeQuestion2 } from '../models/typeQuestion2';
import { TypeQuestionRM } from '../models/typeQuestionRM';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private typeAnswers: BehaviorSubject<string> = new BehaviorSubject<string>("null");
  private answers: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private answersColor: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private answersColor2: BehaviorSubject<string> = new BehaviorSubject<string>(""); 
  private botaoExcluir: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private routerAnswer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ruBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private ruRecorded: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private rmBoolRecorded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private rmRecorded: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private gridRecorded: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private topicsBool2: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private ruBool2: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private answersBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private topicsBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private typeQuestionBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private gridBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private gridTopicsBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private addRuRecordedBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private addRmRecordedBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private addGridRecordedBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private answersTopicsBool: Subject<boolean> = new Subject<boolean>();
  private answerContainerBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private answersDeleteBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private deleteRuRecordedBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private deleteRmRecordedBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private deleteGridRecordedBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private deleteGridTopicRecordedBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private topicBool:  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private rmBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private question: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private myQuestion: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private myQuestion2: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private typeQuestionRU: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  setAnswers(value: string) {
    this.answers.next(value);
  }

  getAnswers() {
    return this.answers.asObservable();
  }

  setColorAnswers(value: string) {
    this.answersColor.next(value);
  }

  getColorAnswers() {
    return this.answersColor.asObservable();
  }

  setColorAnswers2(value: string) {
    this.answersColor2.next(value);
  }

  getColorAnswers2() {
    return this.answersColor2.asObservable();
  }

  setAnswersLayout(value: string) {
    this.typeAnswers.next(value);
  }

  getAnswersLayout() {
    return this.typeAnswers.asObservable();
  }

  setBotaoExcluir(value: number) {
    this.botaoExcluir.next(value);
  }

  getBotaoExcluir() {
    return this.botaoExcluir.asObservable();
  }

  setRouterAnswer(value: boolean) {
    return this.routerAnswer.next(value);
  }

  getRouterAnswer() {
    return this.routerAnswer.asObservable();
  }

  setRuBool(value: boolean) {
    this.ruBool.next(value)
  }

  getRuBool() {
    return this.ruBool.asObservable();
  }

  //enviar objeto pro multi-updcomponent pra passar o objeto Ru gravado 
  setRuRecorded(value: TypeQuestion) {
    this.ruRecorded.next(value)
  }

  // obter valor no multi-updanswers component
  getRuRecorded() {
    return this.ruRecorded.asObservable();
  }

  //enviar objeto pro multi-updcomponent pra passar o objeto Rm gravado 
  setRmRecorded(value: TypeQuestionRM) {
    this.rmRecorded.next(value)
  }

  // obter valor no multi-updanswers component
  getRmRecorded() {
    return this.rmRecorded.asObservable();
  }

  //enviar objeto pro multi-updcomponent pra passar o objeto Grid gravado 
  setGridRecorded(value: TypeQuestion2) {
    this.gridRecorded.next(value)
  }

  // obter valor no multi-updanswers component
  getGridRecorded() {
    return this.gridRecorded.asObservable();
  }

   //enviar valor booleano para answers component - enviado do  método setQuestionRM do homeComponent 
  setRMBoolRecorded(value: boolean) {
    this.rmBoolRecorded.next(value)
  }

  // obter valor no answers component
  getRMBoolRecorded() {
    return this.rmBoolRecorded.asObservable()
  }

  //enviar valor booleano pro multi-upd component - enviado do método setQuestion do homecomponent
  setAddRuRecordedBool(value: boolean) {
    this.addRuRecordedBool.next(value)
  }

  //obter valor no multl-upd component
  getAddRuRecordedBool() {
    return this.addRuRecordedBool.asObservable();
  }

   //enviar valor booleano pro multi-upd component - enviado do método setQuestionRm do homecomponent
  setAddRmRecordedBool(value: boolean) {
    this.addRmRecordedBool.next(value)
  }

  //obter valor no multl-upd component
  getAddRmRecordedBool() {
    return this.addRmRecordedBool.asObservable();
  }

   //enviar valor booleano pro multi-upd component - enviado do método setQuestion2 do homecomponent
   setAddGridRecordedBool(value: boolean) {
    this.addGridRecordedBool.next(value)
  }

  //obter valor no multl-upd component
  getAddGridRecordedBool() {
    return this.addGridRecordedBool.asObservable();
  }

  //enviar valor booleano do topicscomponent pro multi-updcomponents
  setGridTopicsBool(value: boolean) {
    this.gridTopicsBool.next(value)
  }

  getGridTopicsBool() {
    return this.gridTopicsBool.asObservable();
  }

  // passar o objeto RU gravado pro answers component
  setTypeQuestionRU(value: TypeQuestion) {
    this.typeQuestionRU.next(value)
  }

  //obter Objeto RU
  getTypeQuestionRU() {
    return this.typeQuestionRU.asObservable();
  }

  setRMBool(value: boolean) {
    this.rmBool.next(value)
  }

  getRMBool() {
    return this.rmBool.asObservable();
  }

  setTopicsBool2(value: boolean) {
    this.topicsBool2.next(value)
  }

  getTopicsBool2() {
    return this.topicsBool2.asObservable();
  }

  setRuBool2(value: boolean) {
    this.ruBool2.next(value)
  }

  getRuBool2() {
    return this.ruBool2.asObservable();
  }

  setGridBool(value: boolean) {
    this.gridBool.next(value)
  }

  getGridBool() {
    return this.gridBool.asObservable();
  }

  setQuestion(value: string) {
    this.question.next(value);
  }

  getQuestion() {
    return this.question.asObservable();
  }

  setAnswersBool(value: boolean) {
    this.answersBool.next(value);
  }

  getAnswersBool() {
    return this.answersBool.asObservable();
  }

  setTopicsBool(value: boolean) {
    this.topicsBool.next(value);
  }

  getTopicsBool() {
    return this.topicsBool.asObservable();
  }

  setMyQuestion(value: string) {
    this.myQuestion.next(value);
  }

  getMyQuestion() {
    return this.myQuestion.asObservable();
  }

  setMyQuestion2(value: string) {
    this.myQuestion2.next(value);
  }

  getMyQuestion2() {
    return this.myQuestion2.asObservable();
  }

  setTypeQuestionBool(value: boolean) {
    this.typeQuestionBool.next(value);
  }

  getTypeQuestionBool() {
    return this.typeQuestionBool.asObservable();
  }

  setAnswersTopicsBool(value: boolean) {
    this.answersTopicsBool.next(value);
  }

  getAnswersTopicsBool() {
    return this.answersTopicsBool.asObservable();
  }

  setAnswerContainerBool(value: boolean) {
    this.answerContainerBool.next(value);
  }

  getAnswerContainerBool() {
    return this.answerContainerBool.asObservable();
  }

  setAnswersDeleteBool(value: boolean) {
    this.answersDeleteBool.next(value);
  }

  getAnswersDeleteBool() {
    return this.answersDeleteBool.asObservable();
  }

  // mandar pro botaoexcluir component
  setDeleteRuRecordedBool(value: boolean) {
    this.deleteRuRecordedBool.next(value);
  }

  // receber valor no botaoexcluir component
  getDeleteRuRecordedBool() {
    return this.deleteRuRecordedBool.asObservable();
  }

  // mandar pro botaoexcluir component
  setDeleteRmRecordedBool(value: boolean) {
    this.deleteRmRecordedBool.next(value);
  }

  // receber valor no botaoexcluir component
  getDeleteRmRecordedBool() {
    return this.deleteRmRecordedBool.asObservable();
  }

  // mandar pro botaoexcluir component
  setDeleteGridRecordedBool(value: boolean) {
    this.deleteGridRecordedBool.next(value);
  }

  // receber valor no botaoexcluir component
  getDeleteGridRecordedBool() {
    return this.deleteGridRecordedBool.asObservable();
  }

  // mandar pro botaoexcluir component do topics component
  setDeleteGridTopicRecordedBool(value: boolean) {
    this.deleteGridTopicRecordedBool.next(value);
  }

  // receber valor no botaoexcluir component
  getDeleteGridTopicRecordedBool() {
    return this.deleteGridTopicRecordedBool.asObservable();
  }

  // mandar pro botaoexcluir component do topics component
  setTopicBool(value: boolean) {
    this.topicBool.next(value);
  }

  // receber valor no botaoexcluir component
  getTopicBool() {
    return this.topicBool.asObservable();
  }
}
