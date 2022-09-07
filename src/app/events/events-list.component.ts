import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "../common/toastr.service";
import { EventsService } from "./shared/events.service";
import { IEvent } from "./shared";

@Component({
  selector: "events-list",
  template: `
    <div>
      <h2>Upcoming Angular Events</h2>
      <hr />
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
          <event-thumbnail
            (click)="handleThumbnailClick(event.name)"
            [event]="event"
          ></event-thumbnail>
        </div>
      </div>
    </div>
  `,
})
export class EventsListComponent implements OnInit {
  events: IEvent;
  constructor(
    private eventsService: EventsService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.events = this.route.snapshot.data["events"];
  }

  handleThumbnailClick(eventName) {
    this.toastr.success(eventName);
  }
}
