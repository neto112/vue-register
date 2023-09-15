<template>
  <div>
    <FormPerson
      formTitle="Adicionar Pessoa"
      submitButtonText="Salvar"
      :initialFormData="formData"
      @submit="addPessoa"
    />
  </div>
</template>

<script setup lang="ts">
import { IPerson } from "@/interface/people";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FormPerson from "@/components/FormPerson.vue";
import Swal from "sweetalert2";

const store = useStore();
const router = useRouter();

const formData: IPerson = {
  id: 0,
  nome: "",
  cpf: "",
  dataNascimento: "",
};

const addPessoa = async () => {
  await store.dispatch("people/addPerson", formData);
  Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "A pessoa foi adicionada com sucesso.",
  });
  router.push("/lista-pessoa");
};
</script>