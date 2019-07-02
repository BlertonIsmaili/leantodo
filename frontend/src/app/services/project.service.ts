import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToDo } from '../model/todo';
import { Project } from '../model/todo';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient, private router: Router) { }
  private apiUrl: string = 'http://localhost:8080';

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + '/api/project', { withCredentials: true });
  }

  public addNewProject(newProject: Project) {
    return this.http.post(this.apiUrl + '/api/project', newProject, { withCredentials: true });
  }

  public updateProject(project: Project) {
    console.log("###");
    console.log(project);
    return this.http.put(this.apiUrl + '/api/project', project, { withCredentials: true });
  }
}
