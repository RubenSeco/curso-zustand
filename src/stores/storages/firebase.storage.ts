import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = "https://zustand-storage-283ec-default-rtdb.firebaseio.com/zustand";

const storageApi: StateStorage = {

  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((resp) => resp.json());
      return JSON.stringify(data);

    } catch (error) {
      console.log(error);
      throw error;

    }
  },

  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((resp) => resp.json());

    console.count("setItem");
    return;
  },

  removeItem: function (name: string): void | Promise<unknown> {
    console.log("removeItem", name);
  }
};

export const firebaseStorage = createJSONStorage(() => storageApi);

