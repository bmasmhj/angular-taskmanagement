import { Component, Input, Output , EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { StorageType, TaskType } from 'src/app/todo/todo.service';
import { KanbanBoardListService } from './board-list.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kanban-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})




export class KanbanBoardListComponent implements OnInit {
  
  task:StorageType = {
      backlog : [],
      todo:[],
      inProgress: [],
      done: [],
  }
  constructor(private todoService: KanbanBoardListService ,  private translate: TranslateService) {}

  ngOnInit(): void {
    this.todoService.tasks$.subscribe((tasks) => {
      console.log(tasks , 'tasks');
      this.task = tasks;
    });
  }


  drop(event: CdkDragDrop<TaskType[]>) {
    this.todoService.drop(event);
  }

  deleteItem(id:number, key:keyof StorageType){
    this.todoService.deleteItem(id,key);
  }

 
}


