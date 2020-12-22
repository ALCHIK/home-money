import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Observable, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {APPEvent} from '../shared/models/event.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.css']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1: Subscription;
  bill: Bill;
  categories: Category[] = [];

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService) {

  }

  ngOnInit() {
    //так как будет 3 запроса к сервису и их нужно синхронизировать
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], APPEvent[] ]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }
  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome').reduce((total, e) => {
      //debugger
      total += e.amount;
      return total;
    }, 0);
    return catEvents;
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercenr(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    console.log(`${cat.name} ${percent}`)
    const className = percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
    return className;
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
