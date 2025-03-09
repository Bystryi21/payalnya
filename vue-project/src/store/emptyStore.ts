import { defineStore } from "pinia";
import axios from "axios";
import { nanoid } from "nanoid";

interface Project {
  id: number;
  name: string;
  taskCount: number;
  status: string;
  createdAt: string;
}

export const useDataStore = defineStore("data", {
  state: () => ({ data: [] as Project[], selectedProject: null }),
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

    async deleteData(id: number) {
      try {
        await axios.delete(`http://localhost:5000/projects/${id}`);
        this.data = this.data.filter((project) => project.id !== id);
      } catch (error) {
        console.error("Помилка при видаленні:", error);
      }
    },

    async addProject(Project: Project) {
      const projectWithId = { ...Project, id: nanoid() };
      try {
        const response = await axios.post(
          "http://localhost:5000/projects",
          projectWithId
        );
        this.data.push(response.data);
      } catch (error) {
        console.error("Помилка при додаванні проекту:", error);
      }
    },

    async editData(id: number, updatedData: Project) {
      try {
        await axios.patch(`http://localhost:5000/projects/${id}`, updatedData);
        await this.getData();
      } catch (error) {
        console.error("Помилка редагування:", error);
      }
    },
  },
});
