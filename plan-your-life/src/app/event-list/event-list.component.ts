import { Component, OnInit } from '@angular/core';
import { PylService } from '../planyourlife.service';
import { HttpClient } from '@angular/common/http';
import { Event } from '../Event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private pylService: PylService, private http: HttpClient ) { }

  events: Event[];

  ngOnInit() {
  }

  getEvents(): void{
    this.pylService.retrieveWordLists().subscribe(events => this.events = events);
    console.log(this.events);
  }

}
