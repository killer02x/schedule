import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddingComponent } from './adding/adding.component';
import { ScheduleComponent } from "./schedule/schedule.component";
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    AddingComponent
  ],
  imports: [
    FormsModule,
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Добавьте HttpClientModule здесь
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
