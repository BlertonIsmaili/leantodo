export class ToDo {
    public id: number;
    public title: string;
    public archived: boolean;
    public done: boolean;
}

export class Project {
    public title: string;
    public user: string;
    public start: Date;
    public end: Date;
    public desc: string;
    public allDay: boolean;
    public proj: boolean;
}

export class Task {
    public name: string;
    public responsible: string;
    public id: number;
    public project : Project;

}