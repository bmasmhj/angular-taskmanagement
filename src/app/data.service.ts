import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogType } from './logs/logs.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private logs: LogType[] = [];
  private logDataSubject = new BehaviorSubject<LogType[] | null>(null);
  logData$ = this.logDataSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    try {
      const savedLog = localStorage.getItem('logs');
      if (savedLog) {
        this.logs = JSON.parse(savedLog);
        this.logDataSubject.next(this.logs);
      }
    } catch (error) {
      console.error('Failed to parse logs from localStorage:', error);
    }
  }

  setLogData(log: LogType): void {
    this.logs = [log, ...this.logs]; // Add new log to the beginning
    this.saveToLocalStorage();
  }

  setArrayLogData(data: LogType[]): void {
    this.logs = data;
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('logs', JSON.stringify(this.logs));
      this.logDataSubject.next(this.logs); // Notify subscribers
    } catch (error) {
      console.error('Failed to save logs to localStorage:', error);
    }
  }
}
