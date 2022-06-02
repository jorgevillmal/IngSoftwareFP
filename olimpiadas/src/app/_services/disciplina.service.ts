import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disciplina } from '../_models/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  API_URI = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getDisciplinas(){
    return this.http.get<Disciplina[]>(this.API_URI+'/disciplina');
  }

  getDisciplina(disciplina: String){
    return this.http.get<Disciplina>(this.API_URI+'/disciplina/'+disciplina);
  }

  createDisciplina(disciplina: Disciplina){
    return this.http.post(this.API_URI+'/disciplina', disciplina);
  }

  updateDisciplina(disciplina: Disciplina){
    return this.http.put(this.API_URI+'/disciplina/'+disciplina.id, disciplina);
  }

  deleteDisciplina(id: number){
    return this.http.delete(this.API_URI+'/disciplina/'+id);
  }
}
