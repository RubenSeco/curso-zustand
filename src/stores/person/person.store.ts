

import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useWeddingBoundStore } from '../wedding';


interface PersonState {
  firstName: string;
  lastName: string;

}

interface Actions {

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}


// Creación del storeAPI separado del persist middleware

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({

  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set(({ firstName: value }), false, "setFirstName"),
  setLastName: (value: string) => set(({ lastName: value }), false, "setLastName")


});



export const usePersonStore = create<PersonState & Actions>()(

  // logger(
  devtools(
    persist(storeApi, {
      name: "person-storage",
      // storage: customSessionStorage,
      // storage: firebaseStorage
    })
  )
  // )
);

usePersonStore.subscribe((nextState, /*prevState*/) => {
  const { firstName, lastName } = nextState;
  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});