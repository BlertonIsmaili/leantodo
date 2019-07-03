import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { TodoService } from 'src/app/services/todo.service';
import { Project } from 'src/app/model/todo';
import { Task } from 'src/app/model/todo';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  public allProjects: Project[] = [];
  public projProject: Project[] = [];
  public newProject: Project = new Project();

  public allTasks: Task[] = [];
  public newTask: Task = new Task();

  constructor(public events: Events, private router: Router, private projectService: ProjectService, private taskService: TodoService) { }


  ngOnInit() {
    this.reloadAllProjects();
    this.reloadAllTasks();
  }

  ionViewDidEnter() {

    this.reloadAllProjects();
  }


  public reloadAllProjects() {
    this.projectService.getAllProjects().subscribe(
      data => {
        this.allProjects = data;
        this.projProject = [];
        for (let project of this.allProjects) {
          if (project.proj) {
            this.projProject.push(project);
          }
        }
      }, err => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    );
  }

  public addTask(p: Project, taskname, taskresponsible) {
    console.log(p+" "+taskname+" "+taskresponsible);

    let task = new Task();
    task.name= taskname;
    task.responsible = taskresponsible;
    task.project = p;

    this.taskService.addNewTask(task).subscribe(
        data => {
          this.reloadAllTasks();
        }, err => {
          console.log(err);
          this.router.navigateByUrl('/login');
        }
      );
  }

  public reloadAllTasks() {
    this.taskService.getAllTasks().subscribe(
      data => {
        this.allTasks = data;
        console.log(this.allTasks[2].project.title); 
      }, err => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    );
  }

}
