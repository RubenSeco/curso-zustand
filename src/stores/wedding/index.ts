import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestsSlice, GuestsSlice } from "./guests.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { ConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";



type ShareState = PersonSlice & GuestsSlice & DateSlice & ConfirmationSlice;



export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestsSlice(...a),
      ...createDateSlice(...a),
      ...createConfirmationSlice(...a),

    })
  )
);