import { Component, signal } from '@angular/core';
import { InputAddListComponent } from '../../components/input-add-list/input-add-list.component'; //components
import { IlistItems } from '../../interface/IListItems.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

//ENUM
import { ElocalStorage } from '../../enum/ElocalStorage.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  imports: [ InputAddListComponent, InputListItemComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IlistItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems(){
    return JSON.parse(localStorage.getItem(ElocalStorage.MY_LIST) || '[]')
  }

  #updateLocalStorage() {
    return localStorage.setItem(
      ElocalStorage.MY_LIST, 
      JSON.stringify(this.#setListItems())
    );
  }

  public getInputAndAddItem(value: IlistItems){
    localStorage.setItem( ElocalStorage.MY_LIST, JSON.stringify([...this.#setListItems(), value]));

    return this.#setListItems.set(this.#parseItems())
  }

  public listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IlistItems) => {
      if(value === 'pending'){
        return !res.checked;
      }

      if(value === 'completed'){
        return res.checked;
      }

      return res;
    })
  }

  public updateItemCheckbox(newItem: {id: string, checked: boolean}){
    this.#setListItems.update((oldValue: IlistItems[]) => {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.checked = newItem.checked;
          return res;
        }

        return res;
      });
      return oldValue;
    });

    return this.#updateLocalStorage()
  }

  public updateItemText(newItem: { id: string, value: string }) {
     this.#setListItems.update((oldValue: IlistItems[]) => {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.value = newItem.value;
          return res;
        }

        return res;
      });
      return oldValue;
    });

    return this.#updateLocalStorage()
  }

  public deleteItem( id: string ) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete o item!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IlistItems[]) => {
        return oldValue.filter((res) => res.id !== id)
    })

      return this.#updateLocalStorage()
      }
    });
  }

  public deleteAllItems() {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete tudo!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ElocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
  }
}
