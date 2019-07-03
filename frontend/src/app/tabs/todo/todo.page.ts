import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ToDo, Task } from 'src/app/model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  constructor(private router: Router,  private taskService: TodoService) { }

  public allToDos: ToDo[] = [];
  public newToDo: ToDo = new ToDo();

  public allTasks: Task[] = [];
  public newTask: Task = new Task();
  
  ngOnInit() {
    this.reloadAllTasks();
  }

  ionViewDidEnter() {

    this.reloadAllTasks();
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

  




