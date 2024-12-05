import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {
  logData: LogType[] = [];
  private subscription: Subscription | null = null;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.logData$.subscribe((data: LogType[] | null) => {
      if (data) {
        this.logData = data;
        console.log('Updated logData:', this.logData);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('Unsubscribing from logData$');
    this.subscription?.unsubscribe(); // Clean up the subscription
  }
}



export interface LogType {
  val: string;
  from: string;
  to: string;
  action: string;
}