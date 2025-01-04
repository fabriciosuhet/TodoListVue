<template>
  <div class="container-fluid mt-4">
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Título</th>
      <th scope="col">Descrição</th>
      <th scope="col">Status</th>
      <th scope="col">Data Criação</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in tasks" v-bind:key="task.id">
      <th scope="row">{{ task.id }}</th>
      <td>{{task.title}}</td>
      <td>{{ task.description }}</td>
      <td>{{ translateStatus(task.status) }}
        <div v-if="task.status === 0 || task.status === 1">
            <button v-if="task.status === 0" type="button" class="btn btn-primary btn-sm me-2" @click="startTask(task.id)">Iniciar Tarefa</button>
            <button v-if="task.status === 1" type="button" class="btn btn-success btn-sm" @click="finishTask(task.id)">Finalizar Tarefa</button>
        </div>
      </td>
      <td>{{ formatDate(task.createdAt) }}</td>
      <td>
        <button type="button" class="btn btn-warning btn-sm me-2" @click="editTask(task)">Editar</button>
        <button type="button" class="btn btn-danger btn-sm" @click="deleteTask(task.id)">Excluir</button>
      </td>
    </tr>
  </tbody>
</table>
<div v-if="isEditing" class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">Editar Tarefa</h5>
        <form @submit.prevent="updateTask">
          <div class="mb-3">
            <label for="title" class="form-label">Título</label>
            <input
              type="text"
              id="title"
              class="form-control"
              v-model="editedTask.title"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Descrição</label>
            <textarea
              id="description"
              class="form-control"
              v-model="editedTask.description"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Salvar</button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancelEdit">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

import axios from 'axios';
import { ref, onMounted } from 'vue';
import { format } from 'date-fns';

// Definindo a lista de tasks como reativa
let tasks = ref([]);

let isEditing = ref(false); // controlar se está editando uma tarefa

let editedTask = ref({
  id: null,
  title: '',
  description: '',
  status: ''
});

const statusMap = {
  0: "Pendente",
  1: "Em progresso",
  2: "Completa"
};

const translateStatus = (status) => {
  return statusMap[status] || "Desconhecido";
};

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm:ss')
}

  onMounted(() => {
  axios.get('https://localhost:44374/tasks')
    .then(res => {
      tasks.value = res.data; // Atualiza o valor de tasks
    })
    .catch(err => {
      console.error('Erro ao buscar tasks:', err);
    },
  );
});

const deleteTask = (taskId) => {
  axios.delete(`https://localhost:44374/tasks/${taskId}`)
  .then(()=> {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
    alert("Tarefa excluido com sucesso.");
  })
  .catch(err =>{
    console.error('Erro ao excluir tarefa', err)
  });
};

const editTask = (task) => {
  editedTask.value = { ...task }; // preenche o formulario com os dados da tarefa
  isEditing.value = true; // exibe o formulario de edição
};

const cancelEdit = () => {
  isEditing.value = false; // esconde o formulario de edição
};

const updateTask = () => {
  axios.put(`https://localhost:44374/tasks/${editedTask.value.id}`, editedTask.value)
    .then(() => {
      // Atualiza a tarefa na lista localmente
      const index = tasks.value.findIndex(task => task.id === editedTask.value.id);
      if (index !== -1) {
        tasks.value[index] = { ...editedTask.value };
      }
      isEditing.value = false; // esconde o formulario de edição
      alert("Tarefa atualizada com sucesso.");
    })
    .catch(err => {
      console.error('Erro ao atualizar tarefa', err);
    });
};

const startTask = (taskId) => {
    axios
        .put(`https://localhost:44374/tasks/${taskId}/start`)
        .then(() => {
            const task = tasks.value.find((task) => task.id === taskId);
            if (task) {
                task.status = 1;
            }
        })
        .catch((err) => {
            alert("Erro ao iniciar tarefa: ", err);
        });
};

const finishTask = (taskId) => {
    axios
        .put(`https://localhost:44374/tasks/${taskId}/finish`)
        .then(() => {
            const task = tasks.value.find((task) => task.id === taskId);
            if (task) {
                task.status = 2;
            }
        })
        .catch((err) => {
            alert("Erro ao finalizar tarefa: ", err);
        });
};

</script>

<style scoped>

</style>
