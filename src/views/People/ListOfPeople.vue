<template>
  <div class="div-container">
    <h1 class="page-title">Lista de Pessoas</h1>
    <div class="filter-inputs">
      <input
        type="text"
        v-model="filterNameCpf"
        placeholder="Filtrar por nome/CPF"
        class="filter-name-cpf"
      />
      <VueDatePicker
        v-model="filterDataNascimento"
        placeholder="Filtrar por Data de Nascimento"
        :enable-time-picker="false"
        format="dd/MM/yyyy"
        :locale="locale"
        class="vue-date-picker"
      />

      <div style="flex-grow: 1"></div>

      <button class="add-button" @click="addPeople">Adicionar pessoa</button>
    </div>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in listOfPeople" :key="person.id">
          <td>{{ person.nome }}</td>
          <td>{{ formatCpf(person.cpf) }}</td>
          <td>{{ formatDayMonthYear(person.dataNascimento) }}</td>
          <td class="icon-pointer">
            <Pencil class="pencil-color" @click="editPerson(person.id)" />
            <Delete class="delete-color" @click="deletePerson(person.id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { IPerson } from "@/interface/people";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Pencil from "vue-material-design-icons/Pencil.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import { useRouter } from "vue-router";
import useComposable from "@/useComp";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { parse, isSameDay } from "date-fns";

const store = useStore();
const listOfPeople = ref([]);
const router = useRouter();
const filterNameCpf = ref("");
const filterDataNascimento = ref<Date | null>(null);
const locale = { lang: "br" };

const filterPeople = () => {
  listOfPeople.value = store.state.people.pessoas.filter((pessoa: IPerson) => {
    const nomeOuCpfInclui =
      pessoa.nome.toLowerCase().includes(filterNameCpf.value.toLowerCase()) ||
      pessoa.cpf.includes(filterNameCpf.value);

    if (filterDataNascimento.value) {
      const pessoaDataNascimento = parse(
        pessoa.dataNascimento,
        "yyyy-MM-dd",
        new Date()
      );

      return (
        nomeOuCpfInclui &&
        isSameDay(filterDataNascimento.value, pessoaDataNascimento)
      );
    }
    return nomeOuCpfInclui;
  });
};

watch([filterNameCpf, filterDataNascimento], () => {
  filterPeople();
});

const { formatDayMonthYear, formatCpf } = useComposable();

const addPeople = () => {
  router.push("/adicionar-pessoa");
};

const editPerson = (personId: number) => {
  router.push({ name: "editar-pessoa", params: { id: personId } });
};

const deletePerson = async (personId: number) => {
  const result = await Swal.fire({
    title: "Tem certeza que deseja excluir o item?",
    text: "Esta ação não pode ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#ff0000",
  });

  if (result.isConfirmed) {
    await store.dispatch("people/deletePerson", personId);
    await fetchPeople();
    Swal.fire("Excluído!", "O item foi excluído com sucesso.", "success");
  }
};

async function fetchPeople() {
  await store.dispatch("people/loadPeople");
  listOfPeople.value = await store.state.people.pessoas;
}

onMounted(() => {
  fetchPeople();
});
</script>

<style scoped>
.div-container {
  width: 70%;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.filter-inputs {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.filter-name-cpf {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-left: 8px;
}

.filter-name-cpf:hover {
  border: 1px solid #aaaeb7;
}

.filter-name-cpf,
.vue-date-picker {
  width: 30%;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.add-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.add-button:hover {
  background-color: #0056b3;
}

.custom-table {
  border-collapse: collapse;
  margin-bottom: 20px;
  width: 100%;
}

thead {
  background-color: #007bff;
  color: white;
}

th {
  padding: 10px;
  text-align: left;
  text-align: center;
}

td {
  padding: 10px;
  border: 1px solid #ddd;
}

.icon-pointer span {
  cursor: pointer;
}

.pencil-color:hover {
  color: aqua;
}

.delete-color:hover {
  color: red;
}

@media (max-width: 768px) {
  .custom-table {
    width: 100%;
    overflow-x: auto;
    font-size: 14px;
  }

  .custom-table th,
  .custom-table td {
    padding: 4px;
  }

  .div-container {
    width: 95%;
  }

  .filter-inputs {
    flex-direction: column;
  }

  input[type="text"] {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .vue-date-picker {
    width: 100%;
  }

  .add-button {
    width: 100%;
  }
}
</style>