import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import { AppStateType } from '../store/app.reducer';
import { fetchRecipes, setRecipes } from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';
import { selectRecipes } from './store/recipe.selectors';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<{ payload: Recipe[] }> {
  constructor(private store: Store<AppStateType>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectRecipes).pipe(
      take(1),
      switchMap((recipesState) => {
        const recipes = recipesState.recipes;
        if (recipes.length === 0) {
          this.store.dispatch(fetchRecipes());
          return this.actions$.pipe(
            ofType(setRecipes),
            take(1),
            map(() => ({ payload: recipes })) // Return the resolved data in the correct format
          );
        } else {
          return of({ payload: recipes }); // Return the resolved data in the correct format
        }
      })
    );
  }
}
