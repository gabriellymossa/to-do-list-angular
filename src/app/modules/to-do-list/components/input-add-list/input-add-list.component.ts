import { ChangeDetectorRef, Component, EventEmitter, inject, Output, ViewChild, ElementRef, Input  } from '@angular/core';
import { IlistItems } from '../../interface/IListItems.interface'; //interfaces
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-list',
  imports: [ NgClass ],
  templateUrl: './input-add-list.component.html',
  styleUrl: './input-add-list.component.scss'
})
export class InputAddListComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef;

  @Input({ required: true}) public inputListItems: Array<IlistItems> = []

  @Output() public outputAddListItem = new EventEmitter<IlistItems>()

  public focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}` 

      this.outputAddListItem.emit({
        id,
        checked: false,
        value
      })
      
      return this.inputText.nativeElement.focus();
    }
  }

}
