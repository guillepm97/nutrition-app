import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  currentUserNutritionist: boolean;

  constructor(private router: Router, private route: ActivatedRoute,
              private userService: UserService) {}

  ngOnInit() {
    this.currentUserNutritionist = this.userService.currentUserNutritionist();
    this.redirectToCorrectTab();
  }

  redirectToCorrectTab() {
    if (this.currentUserNutritionist) {
      this.router.navigate(['./clients'], { relativeTo: this.route });
    } else {
      this.router.navigate(['./diary'], { relativeTo: this.route });
    }
  }
}
