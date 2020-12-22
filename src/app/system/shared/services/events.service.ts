import {BaseApi} from '../../../shared/core/base-api';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {APPEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: APPEvent): Observable<APPEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<APPEvent[]> {
    return this.get('events');
  }

  // @ts-ignore
  getEventById(id: string): Observable<APPEvent> {
    return this.get(`events/${id}`);
  }
}
