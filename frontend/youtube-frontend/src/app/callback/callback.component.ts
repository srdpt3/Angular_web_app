import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) {

    userService.registerUser();
    console.log("calling callback")
    this.router.navigateByUrl('')
  }

  ngOnInit(): void {

  }

}
