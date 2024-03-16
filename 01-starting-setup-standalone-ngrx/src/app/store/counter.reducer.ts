import { Action, createReducer, on } from '@ngrx/store';
import { INCREMENT, decrement, set } from './counter.actions';
// import { increment } from './counter.actions';
import { increment } from './counter.actions';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (state, action) => action.value)
);

// this function is wrapped in createReducer function above
// export function counterReducer(
//   state = initialState,
//   action: CounterActions | Action
// ) {
//   if (action.type === INCREMENT) {
//     // return state + 1;
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }
