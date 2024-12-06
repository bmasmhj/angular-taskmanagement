import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onSubmit(): void {
    // Check if both fields are filled
    if (this.username && this.password) {
      const authToken = { username: this.username, password: this.password };

      if (this.rememberMe) {
        // Save to localStorage if Remember Me is checked
        localStorage.setItem('authToken', JSON.stringify(authToken));
      } else {
        // Save to sessionStorage if Remember Me is not checked
        sessionStorage.setItem('authToken', JSON.stringify(authToken));
      }

      // Redirect to a different page after successful login
      // For now, let's just log the token and navigate to a dashboard
      console.log('User authenticated:', authToken);
      // const returnUrl =  get from query params
      let returnUrl = window.location.search.split('returnUrl=')[1]
      console.log('returnUrl:', returnUrl)
      if(returnUrl === undefined || returnUrl === ''){
        returnUrl = '/todo'
      }else{
        returnUrl = decodeURIComponent(returnUrl)
      }
      this.router.navigate([returnUrl]); // Assuming a dashboard route
    } else {
      alert('Please enter both username and password!');
    }
  }
}
