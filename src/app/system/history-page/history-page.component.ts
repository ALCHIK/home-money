import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Observable, Subscription} from 'rxjs';
import {APPEvent} from '../shared/models/event.model';
import {Category} from '../shared/models/category.model';
import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService, private  eventService: EventsService) { }
  s1: Subscription;
  isLoaded = false;
  categories: Category[] = [];
  events: APPEvent[] = [] ;
  filteredEvents: APPEvent[] = [];

  chartData = [];
  isFilterVisible = false;

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents(),
    ).subscribe((data: [Category[], APPEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }
  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();//дубликат массива эвентов
  }
  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }
  openFilter() {
    this.toogleFilterVisibility(true);
  }
  onFilterCancel() {
    this.toogleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }
  onFilterApply(filterData) {
    this.toogleFilterVisibility(false);
    this.setOriginalEvents();
    const startPeriod = moment().startOf(filterData.period).startOf('d')
    const endPeriod = moment().endOf(filterData.period).endOf('d')
    this.filteredEvents = this.filteredEvents.filter((e) => {
      return filterData.types.indexOf(e.type) !== -1;
    }).filter((e) => {
      return filterData.categories.indexOf(e.category.toString()) !== -1;
    }).filter((e) => {
      const momentData = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentData.isBetween(startPeriod, endPeriod);
    });
    this.calculateChartData();
  }
  ngOnDestroy() {
      this.s1.unsubscribe();
  }
  private toogleFilterVisibility(dir: boolean) {
  this.isFilterVisible = dir;
  }
}
