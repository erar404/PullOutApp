import { createStore, useStore as baseUseStore, Store } from 'vuex';
import darkMode, { DarkModeState } from './modules/darkMode';

export interface StoreState {
    darkMode: DarkModeState,
}

const store = createStore<StoreState>({
    modules: {
        darkMode,
    },
    strict: process.env.NODE_ENV !== 'production'
});

export function useStore(): Store<StoreState> {
    return baseUseStore();
  }
  
  export default store;