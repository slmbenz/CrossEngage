import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
    // This method simply calls the register() method of AuthService, 
    // subscribe to the returned Observable and navigate to the home page when registration is done
    register(form) {
        // The register() method takes an Angular form object
        // value variable contains a JS object that corresponds to the fields of the form and their values
        this.authService.register(form.value).subscribe((res) => {
            // navigateByUrl() method of the Angular Router navigate to a page by its URL
            this.router.navigateByUrl('home');
        });
    }

}
