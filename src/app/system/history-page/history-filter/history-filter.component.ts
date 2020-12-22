import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit {

  constructor() { }

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ]
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]
  ngOnInit() {
  }
  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.onFilterCancel.emit();
  }
  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }
  //cheked or value в таргет хранится
  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);

  }
  handleChangeCategory({checked, value }) {
    this.calculateInputParams('selectedCategories', checked, value);
  }
  applyFilter() {
    this.onFilterApply.emit(
      {
        types: this.selectedTypes,
        categories: this.selectedCategories,
        period: this.selectedPeriod
      });
  }

}