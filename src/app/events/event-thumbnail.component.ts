import { Component, Input } from "@angular/core";
import { IEvent } from "./shared";

@Component({
  selector: "event-thumbnail",
  template: ` <div
    [routerLink]="['/events', event.id]"
    class="well hoverwell thumbnail"
  >
    <h3>{{ event?.name | uppercase }}</h3>
    <div>Date: {{ event?.date | date: "d/MM/y" }}</div>
    <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
      Time: {{ event?.time }} |
      <span *ngSwitchCase="'8:00 am'">Early start</span>
      <span *ngSwitchCase="'10:00 am'">Late start</span>
      <span *ngSwitchDefault>Normal start</span>
    </div>

    <div>Price: {{ event?.price | currency: 'USD' }}</div>
    <div *ngIf="event?.location">
      <span>Location: {{ event?.location?.address }}</span>
      <span class="pad-left"
        >{{ event?.location?.city }}, {{ event?.location?.country }}</span
      >
    </div>
    <div *ngIf="event?.onlineUrl">Online URL: {{ event?.onlineUrl }}</div>
  </div>`,

  styles: [
    `
      .green {
        color: green !important;
      }
      .orange {
        color: orange !important;
      }
      .red {
        color: red !important;
      }
      .bold {
        font-weight: bold;
      }
      .pad-left {
        margin-left: 5px;
      }
      .thumbnail {
        min-height: 210px;
      }
    `,
  ],
})
export class EventThumbnailComponent {
  @Input() event: IEvent;

  getStartTimeClass() {
    if (this.event && this.event.time === "8:00 am") {
      return "green bold";
    } else if (this.event && this.event.time === "10:00 am") {
      return "orange bold";
    } else {
      return "red bold";
    }
  }
}
