import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  hasLogin = false;
  currentLanguage = 'en';
  languages:string[]  = [ "en" , "np" ]
  constructor(private translate: TranslateService) {
    // Set default language
    // this.translate.setDefaultLang('en');
    // get the current language from local storage
    const language = localStorage.getItem('language') || 'en';
    this.currentLanguage = language;
    this.translate.use(language);
  }

  ngOnInit(): void {
    //  check if user is logged in
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if(token){
      this.hasLogin = true;
    }
  }
  navigations = [
    { link: 'tictactoe', label: 'tictactoe'},
    { link: 'todo', label: 'backlog'},
    { link: 'kanban', label: 'scrumboard'},
  ];

  logout(){
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    window.location.reload();
  }

  switchLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    localStorage.setItem('language', selectElement.value);  // Save the selected language to local storage
    const language = selectElement.value || 'en';  // Fallback to 'en'
    this.translate.use(language);   // Use the selected language
  }

  // appcomponent

}
