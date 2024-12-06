import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../data.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {
  logData: LogType[] = [];
  private subscription: Subscription | null = null;
// 
//   constructor(private sharedService: SharedService) {}
//   constructor(private translate: TranslateService) {
//     // Set default language
//     this.translate.setDefaultLang('en');
//   }

constructor(private sharedService: SharedService , private translate: TranslateService) {
}

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
  translateLog(log: any): string {
    // Translate the log action dynamically
    return this.translate.instant(`logs.${log.action}`, log);
  }
  
}



export interface LogType {
  val: string;
  from: string;
  to: string;
  action: string;
}