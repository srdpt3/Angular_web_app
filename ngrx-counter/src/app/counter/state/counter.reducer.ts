import { Action, createReducer, on } from "@ngrx/store";
import { changeChannelName, customIncrement, decrement, increment, reset } from "./counter.actions";
import { CounterState, initialState } from "./counter.state";

const _counterReducer = createReducer(
    initialState,
    on(increment, (state: CounterState) => {
        return {
            ...state,
            counter: state.counter + 1,
        };
    }),
    on(decrement, (state: CounterState) => {
        return {
            ...state,
            counter: state.counter - 1,
        };
    }),
    on(reset, (state: CounterState) => {
        return {
            ...state,
            counter: 0,
        };
    }),
    on(customIncrement, (state, action) => {
        console.log(action);
        return {
            ...state,
            counter: state.counter + action.count,
        };
    }),
    on(changeChannelName, (state) => {
        return {
            ...state,
            channelName: 'changed TEst',
        };
    })
);

export function counterReducer(state: CounterState | undefined, action: Action) {
    return _counterReducer(state, action);
}
