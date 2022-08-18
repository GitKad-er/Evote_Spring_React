import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServivesService } from '../login/auth-servives.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-test-login',
  templateUrl: './test-login.component.html',
  styleUrls: ['./test-login.component.css']
})
export class TestLoginComponent implements OnInit {


  title = 'LGMAO'
  formGroup: any
  iscon: boolean = false
  hideBtn: boolean = true
  showBtn: boolean = false

  token: any
  data: any

  constructor(
    private AuthService: AuthServivesService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  LoginProcess() {
    this.hideBtn = false
    this.showBtn = true

    if (this.formGroup.valid) {
      this.AuthService.login(this.formGroup.value).subscribe(
        (res) => {
          (this.data = res), localStorage.setItem('token', this.data.token)

          localStorage.setItem('id', this.data.id)
          localStorage.setItem('username', this.data.username)
          localStorage.setItem('email', this.data.email)
          localStorage.setItem('role', this.data.roles)
          localStorage.setItem('tokenType', this.data.tokenType)
          localStorage.setItem('accessToken', this.data.accessToken)

           console.log ("//////////////////////")
           console.log (this.data)
           this.iscon = true

          this.router.navigateByUrl('/app/dashbord')
        },
        (err) => {
          this.hideBtn = true
          this.showBtn = false
    

          this.toastr.error('Veuillez réessayer','Email ou mot de passe incorect', {
            timeOut: 3000,
            closeButton: true,
            progressBar:true,
            positionClass: 'toast-center-center'
          });
        },
      )
    }
  }
}
