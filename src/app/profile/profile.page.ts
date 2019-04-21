import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  user$: Observable<User>;

  constructor(public userService: UserService,
              public authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.userService.getCurrentUser();
  }

  onSignOut() {
    this.authService.signOut();
  }
}
