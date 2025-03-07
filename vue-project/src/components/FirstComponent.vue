<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Назва проекту</th>
        <th>Кількість завдань</th>
        <th>Статус</th>
        <th>Дата створення</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project in dataStore.data" :key="project.id">
        <td>{{ project.id }}</td>
        <td>{{ project.name }}</td>
        <td>{{ project.taskCount }}</td>
        <td>{{ project.status }}</td>
        <td>{{ project.createdAt }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useDataStore } from "../store/emptyStore";
import { onMounted } from "vue";

const dataStore = useDataStore();
onMounted(() => {
  dataStore.getData();
});

const values = dataStore.data;
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
</style>
