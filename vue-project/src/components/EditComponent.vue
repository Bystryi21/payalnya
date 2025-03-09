<template>
  <div class="firstContainer">
    <form @submit.prevent="editProject" class="formWrapper">
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
      <button type="submit">Змінити проект</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newProject = ref({
  name: "",
  taskCount: 0,
  status: "active",
  createdAt: new Date().toISOString().split("T")[0],
});

const editProject = async (id, newValues) => {
  const getById = await dataStore.getDataById(id);

  try {
    await dataStore.editData(id);
    await dataStore.getData();
  } catch (error) {
    console.error("Помилка при редагуванні:", error);
  }
};
</script>
<style></style>
