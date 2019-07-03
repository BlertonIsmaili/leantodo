import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../model/todo';
import { Project } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private router: Router) { }
  private apiUrl: string = 'http://localhost:8080';

  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/api/task', { withCredentials: true });
  }

  public addNewTask(newToDo: Task) {
    return this.http.post(this.apiUrl + '/api/task', newToDo, { withCredentials: true });
  }



}

