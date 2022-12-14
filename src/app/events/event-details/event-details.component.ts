import { Component } from "@angular/core";
import { EventsService } from "../shared/events.service";
import { ActivatedRoute, Params } from "@angular/router";
import { IEvent, ISession } from "../shared";

@Component({
  templateUrl: "./event-details.component.html",
  styles: [
    `
      .container {
        padding-left: 20px;
        padding-right: 20px;
      }

      .event-image {
        height: 100px;
      }

      a {
        cursor: pointer;
      }
    `,
  ],
})
export class EventDetailsComponent {
  event: IEvent;
  addMode: boolean;
  filterBy: string = "all";
  sortBy: string = "votes";

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.event = data["event"];
      this.addMode = false;
    });
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(
      null,
      this.event.sessions.map((s) => s.id)
    );
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventsService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
