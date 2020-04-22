import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private _userService: UserServiceService) { }


  ngOnInit(): void {
  }

}
