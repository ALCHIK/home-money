import { Component, OnInit, OnDestroy } from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Observable, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  currency: any;
  bill: Bill;

  constructor(private billService: BillService) { }

  ngOnInit() {
    //combineLatest для последовательного выполнения и далее подписки
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data:[Bill, any]) => {
      this.currency = data[0];
      this.bill = data[1];
    })
  }

  onRefresh() {
    this.sub2 = this.billService.getCurrency().subscribe(
      (currency: any) => {
          this.currency = currency;
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if(this.sub2) {
      this.sub2.unsubscribe();
    }
  }


}
