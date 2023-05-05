import toolkit from './toolkit';
import stateReducer from './stateSlice';

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

const { configureStore } = toolkit;
export const createStore = () => {
  return configureStore({
    reducer: {
      state: stateReducer,
    },
  });
};
