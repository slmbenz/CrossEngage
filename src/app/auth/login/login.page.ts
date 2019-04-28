import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
    // login() method simply calls the login() method of AuthService
    // and subscribe to the returned Observable then navigate to the home page when login is done
    login(form) {
        this.authService.login(form.value).subscribe((res) => {
            this.router.navigateByUrl('home');
        });
    }

}
