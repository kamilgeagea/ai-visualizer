import React, { createContext, useReducer, Reducer, Dispatch } from "react";

import { Actions } from "./actions";

interface ProviderProps {
  children: React.ReactNode;
}

type BoundActions<ActionCreators> = {
  [key in keyof ActionCreators]: ActionCreators[key] extends (dispatch: Dispatch<Actions>) => infer Function ? Function : never
};

type ContextType<State, ActionCreators> = {
  state: State;
} & BoundActions<ActionCreators>

const createDataContext = <State, ActionCreators extends {}>(
  initialState: State,
  actions: ActionCreators,
  reducer: Reducer<State, Actions>
) => {
  const Context = createContext({ state: initialState } as ContextType<State, ActionCreators>);

  const Provider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {} as BoundActions<ActionCreators>;
    for (let key in actions) {
      // @ts-ignore
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}
      >
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
