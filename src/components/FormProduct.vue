<template>
  <div class="container">
    <div class="header">
      <font-awesome-icon
        :icon="['fas', 'arrow-circle-left']"
        @click="goBack"
        class="arrow-icon"
        size="xl"
      />
      <h2 class="form-title">{{ formTitle }}</h2>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="descricao">Descrição:</label>
        <input type="text" id="descricao" v-model="formData.descricao" />
      </div>
      <div class="form-group">
        <label for="valoUnitario">Valor Unitário:</label>
        <input
          type="number"
          id="valoUnitario"
          v-model="formData.valoUnitario"
        />
      </div>
      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { showErrorAlert } from "@/utils/alerts";

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
  props.initialFormData || { descricao: "", valoUnitario: "" }
);

const submitForm = () => {
  if (!formData.value.descricao) {
    showErrorAlert("Por favor, preencha o campo de Descrição");
    return;
  }
  if (formData.value.valoUnitario <= 0) {
    showErrorAlert("O valor unitário deve ser maior que zero");
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
