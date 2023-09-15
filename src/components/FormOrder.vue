<template>
  <div class="container">
    <div class="header">
      <ArrowLeft @click="goBack" class="arrow-icon" />
      <h2 class="form-title">{{ formTitle }}</h2>
    </div>
    <form @submit.prevent="submitForm">
      <div v-for="(cliente, index) in formData.cliente" :key="index">
          <input
            type="text"
            v-model="cliente.nome"
            placeholder="Nome do Cliente"
          />
        </div>
      <div class="form-group">
        <label for="dataEmissao">Data de Emissão:</label>
        <input type="date" id="dataEmissao" v-model="formData.dataEmissao" />
      </div>
      <div class="form-group">
        <label for="valorTotal">Valor Total:</label>
        <input type="number" id="valorTotal" v-model="formData.valorTotal" />
      </div>
<div class="form-group">
  <label for="itens">Itens do Pedido:</label>
  <div v-for="(item, index) in formData.itens" :key="index">
    <div class="input-group">
    <input
      type="text"
      v-model="item.produto.descricao"
      placeholder="Descrição do Produto"
      class="input-field"
    />
    <input
      type="number"
      v-model="item.quantidade"
      placeholder="Quantidade do Produto"
      class="input-field"
    />
    <div class="icon-group">
    <Delete @click="removeItem(index)" class="delete-icon" />
    </div>
  </div>
  </div>
    <div class="icon-group">
      <Plus @click="addItem" class="plus-icon" />
    </div>
</div>
      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import Delete from "vue-material-design-icons/Delete.vue";

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
  props.initialFormData || {
    cliente: null,
    dataEmissao: "",
    valorTotal: 0,
    itens: [],
  }
);

const addItem = () => {
  formData.value.itens.push({
    produto: { descricao: "", id: 0 }, 
    quantidade: 0,
  });
};

const removeItem = (index: number) => {
  formData.value.itens.splice(index, 1);
};

const submitForm = () => {
  if (!formData.value.cliente) {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "Por favor, selecione um cliente",
    });
    return;
  }
  if (!formData.value.dataEmissao) {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "Por favor, preencha a Data de Emissão",
    });
    return;
  }
  if (formData.value.valorTotal <= 0) {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "O Valor Total deve ser maior que zero",
    });
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

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-field {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.icon-group {
  display: flex;
  align-items: center;
}

.delete-icon,
.plus-icon {
  cursor: pointer;
  font-size: 20px;
  color: red;
}
</style>
