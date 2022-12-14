import { Component } from "@angular/core";
import { EventsService, ISession } from "../events";
import { AuthService } from "../user/auth.service";

@Component({
  selector: "nav-bar",
  templateUrl: "./navbar.component.html",
  styles: [
    `
      .nav .navbar-nav {
        font-size: 15px;
      }

      #searchForm {
        margin-right: 100px;
      }

      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }

        li > a.active {
          color: #f97924;
        }
      }
    `,
  ],
})
export class NavBarComponent {
  searchTerm: string = "";
  foundSessions: ISession[];

  constructor(
    private auth: AuthService,
    private eventsService: EventsService
  ) {}

  searchSessions(searchTerm) {
    this.eventsService.searchSessions(searchTerm).subscribe((sessions) => {
      this.foundSessions = sessions;
    });
  }
}
