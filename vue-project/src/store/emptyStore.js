import { defineStore } from "pinia";
import axios from "axios";
import { nanoid } from "nanoid";
export const useDataStore = defineStore("data", {
  state: () => ({ data: [], selectedProject: null }),
  actions: {
    async getData() {
      try {
        const response = await axios.get(
          "https://67d1c24290e0670699bb72ac.mockapi.io/project"
        );
        console.log(response.data);
        this.data = response.data;
      } catch (error) {
        console.log("Помилка при запиті до Апі");
      }
    },
    async deleteData(id) {
      try {
        await axios.delete(
          `https://67d1c24290e0670699bb72ac.mockapi.io/project/${id}`
        );
        this.data = this.data.filter((project) => project.id !== id);
      } catch (error) {
        console.error("Помилка при видаленні:", error);
      }
    },
    async addProject(Project) {
      const projectWithId = { ...Project, id: nanoid() };
      try {
        const response = await axios.post(
          "https://67d1c24290e0670699bb72ac.mockapi.io/project",
          projectWithId
        );
        this.data.push(response.data);
      } catch (error) {
        console.error("Помилка при додаванні проекту:", error);
      }
    },
    async editData(id, updatedData) {
      try {
        const { id: _, ...updatedDataWithoutId } = updatedData;

        await axios.put(
          `https://67d1c24290e0670699bb72ac.mockapi.io/project/${id}`,
          updatedDataWithoutId
        );
        await this.getData();
      } catch (error) {
        console.error("Помилка редагування:", error);
      }
    },
  },
});
