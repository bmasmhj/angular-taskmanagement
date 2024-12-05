import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../data.service';
import { LogType } from '../logs/logs.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private tasksSubject = new BehaviorSubject<TaskType[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private tasks: StorageType = { backlog: [] , todo: [] , inProgress: [] , done: [] };
  private nextId = 1;
  private sharedService = new SharedService();

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.nextId = this.tasks.backlog.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
      this.tasksSubject.next(this.tasks.backlog);
    }
  }

  getTasks() {
    return this.tasks;
  }

  addTask(name: string) {
    const newTask = { id: this.nextId++, name, completed: false };
    this.tasks.backlog.push(newTask);
    this.tasksSubject.next(this.tasks.backlog); // Emit updated state
    this.saveToLocalStorage();
    let log :LogType = {
      val : name,
      from : 'mind',
      to : 'backlog',
      action : 'added'
    }
    this.sharedService.setLogData(log);
  }

  
  toggleTask(id: number) {
    const task = this.tasks.backlog.find(task => task.id === id);
    if (task) {
      task.selected = !task.selected;
      this.tasksSubject.next(this.tasks.backlog); // Emit updated state
    }
  }

  toggleAllTask() { 
    this.tasks.backlog.forEach(task => task.selected = !task.selected);
    this.tasksSubject.next(this.tasks.backlog); // Emit updated state


  }

  deleteTask(id: number) {
    this.tasks.backlog = this.tasks.backlog.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks.backlog); // Emit updated state
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    // only save the backlog tasks 
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  moveToTodoTask(id: number) {
    const task = this.tasks.backlog.find(task => task.id === id);
    if (task) {
      this.tasks.todo.push(task);
      this.tasks.backlog = this.tasks.backlog.filter(task => task.id !== id);
      this.tasksSubject.next(this.tasks.backlog); // Emit updated state
      this.saveToLocalStorage();
    }
  }

  moveSelectedTask() {
    const selectedTasks = this.tasks.backlog.filter(task => task.selected);
    if (selectedTasks.length === 0) {
      alert('Please select at least one task to move.');
      return;
    }
    this.tasks.todo = this.tasks.todo.concat(selectedTasks);
    this.tasks.backlog = this.tasks.backlog.filter(task => !task.selected);
    this.tasksSubject.next(this.tasks.backlog); // Emit updated state
    this.saveToLocalStorage();
  }

}


export interface TaskType {
  id: number;
  name: string;
  selected ?: boolean;
}

export interface StorageType {
  backlog : TaskType[];
  todo : TaskType[];
  inProgress : TaskType[];
  done : TaskType[];
}