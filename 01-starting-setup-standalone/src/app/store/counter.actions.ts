import { Action, createAction, props } from '@ngrx/store';

export const INCREMENT = '[Counter] Increment';
export const DECREMENT = '[Counter] Decrement';

export const increment = createAction(INCREMENT, props<{ value: number }>());

export const decrement = createAction(DECREMENT, props<{ value: number }>());

// another, old way to create action
// export class IncrementAction implements Action {
//   readonly type = INCREMENT;

//   constructor(public value: number) {}
// }

// export type CounterActions = IncrementAction | DecrementAction;
// export type CounterActions = IncrementAction;
