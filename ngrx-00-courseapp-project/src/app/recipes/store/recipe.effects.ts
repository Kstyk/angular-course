import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchRecipes, setRecipes, storeRecipes } from './recipe.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { AppStateType } from 'src/app/store/app.reducer';
import { selectRecipes } from './recipe.selectors';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppStateType>
  ) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://angular-udemy-4be22-default-rtdb.firebaseio.com//recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return setRecipes({ payload: recipes });
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeRecipes),
        withLatestFrom(this.store.select(selectRecipes)),
        switchMap(([actionData, recipeState]) => {
          return this.http.put(
            'https://angular-udemy-4be22-default-rtdb.firebaseio.com//recipes.json',
            recipeState.recipes
          );
        })
      ),
    { dispatch: false }
  );
}
