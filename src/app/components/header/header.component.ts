import { AuthService } from '../../service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../../shared/modals/login-modal/login-modal.component';
import { RegistrationModalComponent } from '../../shared/modals/registration-modal/registration-modal.component';
import { debounceTime, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  isAdmin = false;


  constructor(
    private userService: UserService,
    public authService: AuthService,
    private modalService: NgbModal) { }


  ngOnInit() {
    this.setLoginSuscription();
  }

  setLoginSuscription() {
    this.authService.loginStatus.pipe(debounceTime(500)).subscribe({
      next: (logStatus: boolean) => {
        this.isLogged = logStatus;

        if(!this.isLogged) {
          this.isAdmin = false;
        }

        this.authService.isAdmin().subscribe({
          next:(isAdmin) => {
            this.isAdmin = isAdmin;
          }
        })
      }
    })
  }


  openLoginModal(){
    this.modalService.open(LoginModalComponent,{size: 'sm'});
  }

  openRegistrationModal(){
    this.modalService.open(RegistrationModalComponent, {size: 'md'});
  }

  logOut(){
    this.authService.isLogged()
    this.authService.logOut();
  }

}



