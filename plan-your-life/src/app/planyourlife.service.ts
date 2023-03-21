import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Query } from '../app/Query';
import { Event } from '../app/Event';
import { Key } from '../app/Key';

@Injectable({
  providedIn: 'root'
})

export class PylService{

  constructor(private http: HttpClient) { }

  sendNewQuery(query: Query): void{
    console.log('query ' + query.text);
    var response = this.http.post<Query>('http://localhost:8000/api/newquery', query).subscribe();
    console.log('Response: ' + response);
    //return response.unsubscribe;
  }

  sendAuthKey(key: Key): void{
    var response = this.http.post<string>('http://localhost:8000/api/newauthkey', key).subscribe();
    console.log(response);
  }

  retrieveWordLists(): Observable<Event[]>{
    console.log('get events invoked.');
    return this.http.get<Event[]>('http://localhost:8000/api/events');
  }
}
