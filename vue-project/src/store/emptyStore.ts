import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({ data: [] }),
  actions: {
    async getData() {
      try {
        const response = await axios.get("http://localhost:5000/projects");
        console.log(response.data);

        this.data = response.data;
      } catch (error) {
        console.log("Помилка при запиті до Апі");
      }
    },
  },
});
