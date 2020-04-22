import { Component, OnInit, OnChanges } from '@angular/core';
import { UserServiceService } from '../services/user/user-service.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, OnChanges {

  public currentUser;
  public img;

  constructor(private _userService: UserServiceService) { }

  ngOnInit(): void { this.getUser() }

  ngOnChanges(){ }

  getUser() {
    this._userService.getUserProfile()
      .subscribe(
        res => {
          this.currentUser = res[0]
          this.img = `data:${this.currentUser.profile.contentType};base64,${this.currentUser.profile.image}`
        },
        err => console.log(err)
      )
  }

  logout() {
    this._userService.logoutUser()
  }

}
