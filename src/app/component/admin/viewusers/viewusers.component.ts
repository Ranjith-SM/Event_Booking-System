import { Component } from '@angular/core';
import { UserDetail } from 'src/app/model/user-detail';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss']
})
export class ViewusersComponent {
  error: string = "";
  userDetails: UserDetail[] = [];
  userDetail: UserDetail = {
    id: 0,
    username: "",
    name: "",
    roles: "",
    joinedAt: "toDateString"
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: UserDetail[] = response.data;
        
        
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
          this.userDetail = userDetails[0];
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });

}
}
