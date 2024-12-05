import { CdkDragDrop, moveItemInArray,  transferArrayItem } from '@angular/cdk/drag-drop';
import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/app/data.service';
import { LogType } from 'src/app/logs/logs.component';
import { StorageType, TaskType } from 'src/app/todo/todo.service';


@Injectable({
  providedIn: 'root'
})


export class KanbanBoardListService {
  private tasks:StorageType = { backlog : [] , todo:[] , inProgress: [] , done: [] };
  private tasksSubject = new BehaviorSubject<StorageType>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();
  
  private sharedService = new SharedService();
  

  constructor() {
    const savedTask = localStorage.getItem('tasks');
    if (savedTask) {
      this.tasks = JSON.parse(savedTask);
      this.tasksSubject.next(this.tasks as StorageType);
    }    
  }


  

  drop(event: CdkDragDrop<TaskType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('Item moved ',event);
      // check if the item index was changed
      if (event.previousIndex !== event.currentIndex) {
        let val = `${event.container.data[event.currentIndex].name}`;
        let moveFromIndex = this.getThPosition(event.previousIndex);
        let moveToIndex = this.getThPosition(event.currentIndex);
        let action = 'moved';
        let log = { val : val , from : moveFromIndex.toString() , to : moveToIndex.toString() , action };
        this.updateLog(log);
      }
   
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

        let movedTo = 'done';
        let moveFRom = 'todo';

        if(event.container.id === 'cdk-drop-list-0'){
          movedTo = 'todo';
        }

        if(event.previousContainer.id === 'cdk-drop-list-0'){
          moveFRom = 'todo';
        }

        if(event.container.id === 'cdk-drop-list-1'){
          movedTo = 'inProgress';
        }

        if(event.previousContainer.id === 'cdk-drop-list-1'){
          moveFRom = 'inProgress';
        }
        let movedElement = event.container.data[event.currentIndex].name;

        let log = { val : movedElement , from : moveFRom , to : movedTo , action : 'changed'};
        this.updateLog(log);
    }
  }

  deleteItem(id:number , key : keyof StorageType){
    let log = {
      val : `${this.tasks[key].find(task => task.id === id)?.name} Deleted`,
      from : key,
      to : 'trash',
      action : 'deleted'
    }
    let newTask = {
      ...this.tasks,
      [key] : this.tasks[key].filter(task => task.id !== id)
    }
    
    this.tasks = newTask;
    this.tasksSubject.next(newTask);
    this.updateLog(log);
    
  }

 

  // addTask() {
  //   if(this.task){
  //     let from = "Backlog"
  //     let to = "To Do"
  //     let action = 'add'
  //     this.updateLog({ val : this.task , from , to , action});
  //     this.task = '';
  //   }
  // }


  getThPosition(index : number){
    if(index === 0){
      return '1st position';
    }else if(index === 1){
      return '2nd position';
    }
    else if(index === 2){
      return '3rd position';
    }
    else{
      return index+1+'th position';
    }
  }

  updateLog(log:LogType){
    this.saveToLocalStorage();
    this.sharedService.setLogData(log);
  }

  saveToLocalStorage() {
    // only save the backlog tasks 
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }


}


