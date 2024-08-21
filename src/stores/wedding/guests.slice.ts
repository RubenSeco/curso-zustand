import { StateCreator } from "zustand";


export interface GuestsSlice {

  guestsCount: number;

  setGuestsCount: (value: number) => void;
}


export const createGuestsSlice: StateCreator<GuestsSlice> = (set) => ({

  guestsCount: 0,

  setGuestsCount: (value: number) => (

    set({ guestsCount: value > 0 ? value : 0 })

  )

});