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
              public userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUserNutritionist = user.type == 'nutritionist';
      this.redirectToCorrectTab();
    });
  }

  redirectToCorrectTab() {
    if (this.currentUserNutritionist) {
      this.router.navigate(['./clients'], { relativeTo: this.route });
    } else {
      this.router.navigate(['./diary'], { relativeTo: this.route });
    }
  }
}
