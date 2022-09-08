import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import {
  CreateEventComponent,
  CreateSessionComponent,
  EventDetailsComponent,
  EventListResolver,
  EventRouteActivator,
  EventsListComponent,
  EventsService,
  EventThumbnailComponent,
  SessionListComponent
} from "./events/index";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CollapsibleWellComponent } from "./common/collapsible-well.component";
import { ToastrService } from "./common/toastr.service";
import { Error404Component } from "./errors/404.component";
import { FrameComponent } from "./frame/frame.component";
import { NavBarComponent } from "./navbar/navbar.component";
import { appRoutes } from "./routes";
import { AuthService } from "./user/auth.service";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
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
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
  ],

  providers: [
    AuthService,
    EventsService,
    EventListResolver,
    ToastrService,
    EventRouteActivator,
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
