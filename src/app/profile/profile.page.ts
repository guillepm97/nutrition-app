import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  user$: Observable<User>;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authService.getCurrentUser();
  }

  onSignOut() {
    this.authService.signOut();
  }
}
