<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <a class="navbar-brand" href="/">Todo List</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link active" aria-current="page">Tarefas</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink to="/form" class="nav-link active" aria-current="page">Cadastrar Tarefa</RouterLink>
        </li>
      </ul>

      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Procurar tarefa" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>

    </div>
  </div>
</nav>
</template>