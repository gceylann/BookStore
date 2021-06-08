import { Component, OnInit } from '@angular/core';
import { UserInfos } from 'src/app/models/auth/user-infos';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userDetails:UserInfos=new UserInfos();
  

  constructor(private authService:AuthService,
              private userService:UserService,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
    this.getUser(email == null ? email = "" : email.toString());
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout()
    window.location.reload();
  }

  getUser(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.userDetails = response.data;
    })
  }

  

}
