import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import { selectShoppingList } from './store/shopping-list.selectors';
import { shoppingListStateType } from './store/shopping-list.reducer';
import { startEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$: Observable<shoppingListStateType>;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{ shoppingList: shoppingListStateType }>
  ) {}

  ngOnInit() {
    this.ingredients$ = this.store.select(selectShoppingList);
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);

    this.store.dispatch(startEdit({ index: index }));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
