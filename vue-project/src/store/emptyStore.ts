import { defineStore } from "pinia";
import axios from "axios";

interface Project {
  id: number;
  name: string;
  taskCount: number;
  status: string;
  createdAt: string;
}

export const useDataStore = defineStore("data", {
  state: () => ({ data: [] as Project[] }),
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
