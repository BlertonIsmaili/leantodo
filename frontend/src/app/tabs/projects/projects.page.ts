import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/todo';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  public allProjects: Project[] = [];
  public projProject: Project[] =[];
  public newProject: Project = new Project();
  
  constructor(public events: Events ,private router: Router, private projectService: ProjectService) {}
  

  ngOnInit() {
    this.reloadAllProjects();
  }

  ionViewDidEnter(){
    
    this.reloadAllProjects();
  }

  public addTaskAndPerson(){
    
  }
 
  public reloadAllProjects() {
    this.projectService.getAllProjects().subscribe(
      data => {
        this.allProjects = data;
        this.projProject = [];
        for(let project of this.allProjects){
          if(project.proj){
            this.projProject.push(project);
          }
        }
      }, err => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    );
  }

}
