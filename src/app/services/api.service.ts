import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeQuestion } from '../models/typeQuestion';
import { Answers } from '../models/answers';
import { Topics } from '../models/topics';
import { Grid } from '../models/grid';
import { TypeQuestion2 } from '../models/typeQuestion2';
import { TypeQuestionRM } from '../models/typeQuestionRM';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // método para enviar dados ao servidor
  postTypeQuestion(typeQuestion: TypeQuestion): Observable<TypeQuestion> {
    return this.http.post<TypeQuestion>(`${environment.BASE_URL}/typeQuestion`, typeQuestion)
  }

  //método para obter dados do servidor
  getTypeQuestion(): Observable<TypeQuestion[]> {
    return this.http.get<TypeQuestion[]>(`${environment.BASE_URL}/typeQuestion`)
  }

  // método para editar dados do servidor
  editTypeQuestion(typeQuestion: TypeQuestion): Observable<TypeQuestion> {
    return this.http.put<TypeQuestion>(`${environment.BASE_URL}/typeQuestion/${typeQuestion.id}`, typeQuestion)
  }

  //método para deletar dados do servidor
  deleteTypeQuestion(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/typeQuestion/${id}`)
  }

  // método para enviar dados ao servidor
  postTypeQuestion2(typeQuestion2: TypeQuestion2): Observable<TypeQuestion2> {
    return this.http.post<TypeQuestion2>(`${environment.BASE_URL}/typeQuestion2`, typeQuestion2)
  }

  //método para obter dados do servidor
  getTypeQuestion2(): Observable<TypeQuestion2[]> {
    return this.http.get<TypeQuestion2[]>(`${environment.BASE_URL}/typeQuestion2`)
  }

  // método para editar dados do servidor
  editTypeQuestion2(typeQuestion2: TypeQuestion2): Observable<TypeQuestion2> {
    return this.http.put<TypeQuestion2>(`${environment.BASE_URL}/typeQuestion2/${typeQuestion2.id}`, typeQuestion2)
  }

  //método para deletar dados do servidor
  deleteTypeQuestion2(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/typeQuestion2/${id}`)
  }

  // método para enviar dados ao servidor
  postTypeQuestionRM(typeQuestionRM: TypeQuestionRM): Observable<TypeQuestionRM> {
    return this.http.post<TypeQuestionRM>(`${environment.BASE_URL}/typeQuestionRM`, typeQuestionRM)
  }

  //método para obter dados do servidor
  getTypeQuestionRM(): Observable<TypeQuestionRM[]> {
    return this.http.get<TypeQuestionRM[]>(`${environment.BASE_URL}/typeQuestionRM`)
  }

  // método para editar dados do servidor
  editTypeQuestionRM(typeQuestionRM: TypeQuestionRM): Observable<TypeQuestionRM> {
    return this.http.put<TypeQuestionRM>(`${environment.BASE_URL}/typeQuestionRM/${typeQuestionRM.id}`, typeQuestionRM)
  }

  //método para deletar dados do servidor
  deleteTypeQuestionRM(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/typeQuestionRM/${id}`)
  }

  // método para enviar dados ao servidor
  postAnswers(answers: Answers): Observable<Answers> {
    return this.http.post<Answers>(`${environment.BASE_URL}/answers`, answers)
  }

  // método para atualizar dados ao servidor
  editAnswers(answers: Answers): Observable<Answers> {
    return this.http.put<Answers>(`${environment.BASE_URL}/answers/${answers.id}`, answers)
  }

  // método para obter dados do servidor
  getAnswers(): Observable<Answers[]> {
    return this.http.get<Answers[]>(`${environment.BASE_URL}/answers`)
  }

  
  // método para excluir dado do servidor
  deleteAnswers(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/answers/${id}`)
  }

  // método para enviar dados ao servidor
  postTopics(topic: Topics): Observable<Topics> {
    return this.http.post<Topics>(`${environment.BASE_URL}/topics`, topic)
  }

  // método para atualizar dados ao servidor
  editTopics(topics: Topics): Observable<Topics> {
    return this.http.put<Topics>(`${environment.BASE_URL}/topics/${topics.id}`, topics)
    
  }

  // método para obter dados do servidor
  getTopics(): Observable<Topics[]> {
    return this.http.get<Topics[]>(`${environment.BASE_URL}/topics`)
  }

  // método para excluir dado do servidor
  deleteTopics(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/topics/${id}`)
  }
}
