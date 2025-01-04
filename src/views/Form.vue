<template>
  <div class="container-fluid">
    <div class="mb-3">
      <label for="form-title" class="form-label">Título</label>
      <input v-model="form.title" type="text" class="form-control" id="form-title" placeholder="Ex: Lavar o carro" :class="{'is-invalid': erros.title}">
    <div v-if="erros.title" class="invalid-feedback">
        {{ erros.title }}
    </div>
</div>

<div class="mb-3">
  <label for="form-description" class="form-label">Descrição</label>
  <textarea v-model="form.description" class="form-control" id="form-description" rows="3" placeholder="Ex: Levar o carro para lavar no lava rapido" :class="{'is-invalid': erros.description}"></textarea>
  <div v-if="erros.description" class="invalid-feedback">
    {{ erros.description }}
</div>
</div>

<button type="button" class="btn btn-outline-primary" @click="salvar()">Salvar</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const form = ref({
    title: "",
    description: "",
});

const erros = ref({
  title: null,
  description: null,
});

const validateForm = () => {
  let isValid = true;

  // Limpa os erros anteriores
  erros.value.title = null;
  erros.value.description = null;

  if (!form.value.title.trim()) {
    erros.value.title = "O título não pode ser vázio.";
    isValid = false;
  }

  if (form.value.description.length > 255) {
    erros.value.description = "A descrição não pode ter mais de 255 caracteres.";
    isValid = false;
  }

  return isValid;
}

const salvar = async () => {

    if (!validateForm()) {
        return;
    }

    try {
        const payload = {
            title: form.value.title,
            description: form.value.description,
        };
        
        await axios.post("https://localhost:44374/tasks", payload);
        
        // limpar o formluario após salvar
        form.value.title = "";
        form.value.description = "";
        alert("Tarefa salva com sucesso");
    }
    catch (erro) {
        console.error("Erro ao salvar a tarefa: ", erro);
        alert("Erro ao salvar a tarefa");
    }
};

</script>
