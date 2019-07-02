import { Component, OnInit, Inject, ViewChild, LOCALE_ID } from '@angular/core';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import { formatDate, DatePipe } from '@angular/common';
import { AlertController, Events } from '@ionic/angular';
import { ProjectsPage } from '../projects/projects.page';
import { Project } from 'src/app/model/todo';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-timerecord',
  templateUrl: './timerecord.page.html',
  styleUrls: ['./timerecord.page.scss'],
})
export class TimerecordPage implements OnInit {

  eventSource = [];

  calendar = {
    mode: 'week',
    currentDate: new Date()
  }

  event ={
      title: '',
      desc:'',
      startTime: '',
      endTime: '',
      allDay: false,
      isproject: false
      };

  minDate = new Date().toISOString();

  ViewTitle = 'Test';

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  
  constructor(private router: Router,public events: Events, private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale, private projectService: ProjectService) { }

  public allProjects: Project[] = [];
  public newProject: Project = new Project();

  ngOnInit() {
    this.reloadAllProjects();
    this.resetEvent();
  }

  resetEvent(){
    this.event = {
      title:'',
      desc:'',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      isproject: false
    };
  }

  addEvent(){
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      isproject: this.event.isproject,
      desc: this.event.desc
    }
    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()+1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();

    if(eventCopy.isproject){
      let user = "user";
      let title = eventCopy.title;
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      let allD = eventCopy.allDay;
      let proj = eventCopy.isproject;
      let desc = eventCopy.desc;
    

      let p = new Project();

     
      p.title = title;
      p.user = user;
      p.start = start;
      p.desc = desc;
      p.end = end;
      p.allD = allD;
      p.proj = proj;
      
      this.projectService.addNewProject(p).subscribe(
        data => {
          console.log("Successfully updated todo.");
          this.reloadAllProjects();
        }, err => {
          console.log(err);
          this.router.navigateByUrl('/login');
        }
      );
    }
  }

  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today(){
    this.calendar.currentDate = new Date();
  }
  changeMode(mode){
    this.calendar.mode = mode;
  }

  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From ' + start + '<br><br>To '+end,
      buttons: ['OK']
    });
    alert.present();
  }

  onViewTitleChanged(title){
    this.ViewTitle = title;
  }



  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);  
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours()+1);
    this.event.endTime = (selected.toISOString());
  }

  public reloadAllProjects() {
    this.projectService.getAllProjects().subscribe(
      data => {
        this.allProjects = data;
      }, err => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    );
  }
}
