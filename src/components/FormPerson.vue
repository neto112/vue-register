<template>
  <div class="container">
    <div class="header">
      <ArrowLeft @click="goBack" class="arrow-icon" />
      <h2 class="form-title">{{ formTitle }}</h2>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="formData.nome" />
      </div>
      <div class="form-group">
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" v-model="formData.cpf" />
      </div>
      <div class="form-group">
        <label for="dataNascimento">Data de Nascimento:</label>
        <input
          type="date"
          id="dataNascimento"
          v-model="formData.dataNascimento"
        />
      </div>
      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import useComposable from "@/utils/useComp";
import { useRouter } from "vue-router";
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import { showErrorAlert } from "@/utils/alerts";

const { validateCPF } = useComposable();
const router = useRouter();

const props = defineProps({
  formTitle: String,
  submitButtonText: String,
  initialFormData: Object,
});

const emit = defineEmits(["submit"]);

function goBack() {
  router.go(-1);
}

const formData = ref(
  props.initialFormData || { nome: "", cpf: "", dataNascimento: "" }
);

const submitForm = () => {
  if (!formData.value.nome) {
    showErrorAlert("Por favor, preencha o campo de Nome.");
    return;
  }
  if (!validateCPF(formData.value.cpf)) {
    showErrorAlert("CPF inválido. Por favor, verifique o CPF.");
    return;
  }
  emit("submit", formData.value);
};
</script>

<style scoped lang="scss">
.container {
  max-width: 400px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow-icon {
  cursor: pointer;
  animation: colorTransition 2s infinite alternate;
}

@keyframes colorTransition {
  0% {
    color: darkblue;
  }
  50% {
    color: rgb(110, 200, 231);
  }
  100% {
    color: darkblue;
  }
}

.form-title {
  flex-grow: 1;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}
</style>