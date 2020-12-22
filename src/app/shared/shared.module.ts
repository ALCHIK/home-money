import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  exports: [ReactiveFormsModule, FormsModule, LoaderComponent ],
  declarations: [LoaderComponent]
})
export class SharedModule {}
