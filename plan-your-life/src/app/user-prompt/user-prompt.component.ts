import { Component, OnInit } from '@angular/core';
import { PylService } from '../planyourlife.service';
import { HttpClient } from '@angular/common/http';
import { Query } from '../Query';
import { Event } from '../Event';
@Component({
  selector: 'app-user-prompt',
  templateUrl: './user-prompt.component.html',
  styleUrls: ['./user-prompt.component.css']
})

export class UserPromptComponent implements OnInit {
  events: Event[];
  query: Query = {
    text: ''
  }

  constructor(private pylService: PylService, private http: HttpClient ) { }

  ngOnInit() {
  }

  
  
  logSubmit(){
    console.log("Query Entered successfully.");
  }

  sendQuery(): void{
    
    console.log("Query recieved, " + this.query.text);
    this.pylService.sendNewQuery(this.query);
    this.query.text = '';
  }

  
}
