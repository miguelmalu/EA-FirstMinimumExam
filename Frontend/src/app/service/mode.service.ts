import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mode } from '../models/mode';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  url = 'http://localhost:3000/api/modes';

  constructor(private http:HttpClient) { }

  getModes(): Observable<Mode[]>{
    return this.http.get<Mode[]>(this.url);
  }

  getMode(nameUser: string): Observable<Mode>{ //Id
    return this.http.get<Mode>(this.url + "/" + nameUser);
  }

  addMode(mode: Mode): Observable<string>{
    return this.http.post(this.url, mode, {responseType: 'text'});
  }

  editMode(mode: Mode, nameUser: string): Observable<string>{ //Id
    return this.http.put(this.url + "/" + nameUser, mode, {responseType: 'text'});
  }

  deleteMode(nameUser: string): Observable<string>{ //Id
    return this.http.delete(this.url + "/" + nameUser, {responseType: 'text'});
  }

}
