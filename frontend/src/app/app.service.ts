import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Event, EventData } from './models/event.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<ApiResponse>(this.apiUrl + '/list').pipe(
      map((response: ApiResponse) => response.events)
    );
  }

  sendRandomEvent(eventData: EventData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl + '/action', eventData);
  }

  getTextClass(type: Event['type']): string {
    switch (type) {
      case 'deviceMalfunction':
        return 'text_device_malfunction';
      case 'temperatureExceeded':
        return 'text_temperature_exceeded';
      case 'doorUnlocked':
        return 'text_door_unlocked';
      default:
        return '';
    }
  }
}
