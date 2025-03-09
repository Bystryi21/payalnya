<template>
  <div class="firstContainer">
    <form @submit.prevent="handleSubmit" class="formWrapper">
      <div>
        <label for="name">Назва проекту</label>
        <input
          type="text"
          id="name"
          v-model="newProject.name"
          required
          class="input"
        />
      </div>
      <div>
        <label for="taskCount">Кількість завдань</label>
        <input
          type="number"
          id="taskCount"
          v-model="newProject.taskCount"
          class="input"
        />
      </div>
      <div>
        <label for="status">Статус</label>
        <select id="status" v-model="newProject.status" class="input">
          <option value="Активний">Активний</option>
          <option value="Завершений">Завершений</option>
        </select>
      </div>
      <div>
        <label for="createdAt">Дата створення</label>
        <input
          type="date"
          id="createdAt"
          v-model="newProject.createdAt"
          class="input"
        />
      </div>
      <button type="submit">
        {{ selectedProject ? "Зберегти зміни" : "Додати проект" }}
      </button>
    </form>
  </div>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Назва проекту</th>
        <th>Кількість завдань</th>
        <th>Статус</th>
        <th>Дата створення</th>
        <th>Дії</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project in dataStore.data" :key="project.id">
        <td>{{ project.id }}</td>
        <td>{{ project.name }}</td>
        <td>{{ project.taskCount }}</td>
        <td>{{ project.status }}</td>
        <td>{{ project.createdAt }}</td>
        <td>
          <button @click="deleteProject(project.id)">Видалити</button>
          <button @click="editProject(project)">Редагувати</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from "vue";
import { useDataStore } from "../store/emptyStore";
import { onMounted } from "vue";

const dataStore = useDataStore();
onMounted(() => {
  dataStore.getData();
});

const newProject = ref({
  name: "",
  taskCount: 0,
  status: "Активний",
  createdAt: new Date().toISOString().split("T")[0],
});

const selectedProject = ref(null);

const handleSubmit = () => {
  if (selectedProject.value) {
    dataStore.editData(selectedProject.value.id, newProject.value);
    selectedProject.value = null;
  } else {
    const project = { ...newProject.value };
    dataStore.addProject(project);
  }

  newProject.value = {
    name: "",
    taskCount: 0,
    status: "Активний",
    createdAt: new Date().toISOString().split("T")[0],
  };
};

const deleteProject = async (id) => {
  try {
    await dataStore.deleteData(id);
    await dataStore.getData();
  } catch (error) {
    console.error("Помилка при видаленні:", error);
  }
};

//початковий стан для редагування проекту
const editProject = (project) => {
  selectedProject.value = project;
  newProject.value = { ...project };
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.firstContainer {
  padding-bottom: 10px;
}

.formWrapper {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
}

.input {
  max-width: 100px;
}
</style>
