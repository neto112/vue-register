<template>
  <div class="div-container">
    <h1 class="project-title">Resumo do Projeto</h1>

    <section class="project-features">
      <h2>1. Cadastro de Pessoas, Produtos e Pedidos:</h2>
      <ul>
        <li>Listagem e filtragem de registros.</li>
        <li>Adição de novos registros.</li>
        <li>Edição de registros existentes.</li>
        <li>Exclusão de registros.</li>
      </ul>
    </section>

    <section class="project-validation">
      <h2>2. Validação de Dados:</h2>
      <ul>
        <li>Nome obrigatório.</li>
        <li>Validação de CPF.</li>
        <li>
          Mensagens de erro amigáveis ao usuário em caso de falha no servidor,
          com o uso de SweetAlert2.
        </li>
      </ul>
    </section>

    <section class="project-architecture">
      <h2>3. Arquitetura e Organização:</h2>
      <ul>
        <li>Utilização de TypeScript para tipagem segura.</li>
        <li>Uso de interfaces para definir a estrutura de dados.</li>
        <li>Componentização e extensibilidade dos componentes JavaScript.</li>
        <li>Criação de funções globais para reutiização de código.</li>
      </ul>
    </section>

    <section class="project-tools">
      <h2>4. Ferramentas Adicionais:</h2>
      <ul>
        <li>Uso da biblioteca Vuex para gerenciamento de estado.</li>
        <li>Integração com uma API RESTful simulada usando o json-server.</li>
        <li>
          O layout foi projetado para funcionar bem em dispositivos móveis e
          desktops.
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.div-container {
  width: 60%;
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 24px auto 0;
}

.project-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.project-features,
.project-validation,
.project-architecture,
.project-tools {
  text-align: left;
}

.feature-item,
.validation-item,
.architecture-item,
.tools-item {
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
}

h2 {
  text-align: left;
  padding-left: 20px;
  font-size: 18px;
}

@media (max-width: 768px) {
  .div-container {
    width: 80%;
  }
}
</style>