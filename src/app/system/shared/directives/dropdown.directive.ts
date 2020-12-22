import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpened = false;

  @HostListener('click') onClick() {
    this.isOpened = !this.isOpened;
  }
}
