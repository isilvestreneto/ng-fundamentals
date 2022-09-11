import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import {
  CollapsibleWellComponent,
  JQ_TOKEN,
  ModalTriggerDirective,
  SimpleModalComponent,
  Toastr,
  TOASTR_TOKEN,
} from "./common/index";
import { Error404Component } from "./errors/404.component";
import {
  CreateEventComponent,
  CreateSessionComponent,
  DurationPipe,
  EventDetailsComponent,
  EventListResolver,
  EventResolver,
  EventsListComponent,
  EventsService,
  EventThumbnailComponent,
  LocationValidator,
  SessionListComponent,
  UpvoteComponent,
  VoterService,
} from "./events/index";
import { FrameComponent } from "./frame/frame.component";
import { NavBarComponent } from "./navbar/navbar.component";
import { appRoutes } from "./routes";
import { AuthService } from "./user/auth.service";

let toastr: Toastr = window["toastr"];
let jQuery = window["$"];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    FrameComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    SimpleModalComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator,
  ],

  providers: [
    AuthService,
    EventsService,
    EventListResolver,
    VoterService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventResolver,
    { provide: "canDeactivateCreateEvent", useValue: checkDirtyState },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm(
      "You have not saved this event, do you really want to cancel?"
    );
  return true;
}
