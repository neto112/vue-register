<template>
  <div>
    <template v-if="formData.nome">
      <FormPerson
        formTitle="Editar Pessoa"
        submitButtonText="Atualizar"
        :initialFormData="formData"
        @submit="updatePerson"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { IPerson } from "@/interface/people";
import FormPerson from "@/components/FormPerson.vue";
import Swal from "sweetalert2";

const store = useStore();
const router = useRouter();
const route = useRoute();

const formData = ref<IPerson>({ nome: "", cpf: "", dataNascimento: "" });

const updatePerson = async () => {
  await store.dispatch("people/editPerson", formData.value);
  await Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Essa pessoa foi atualizada com sucesso.",
  });
  router.push("/lista-pessoa");
};

const fetchPersonData = async (personId: number) => {
  const person = store.getters["people/getPersonById"](personId);
  formData.value = { ...person };
};

onMounted(async () => {
  const personId = Number(route.params.id);
  await fetchPersonData(personId);
});
</script>