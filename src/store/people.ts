import { IPerson, IState } from '../interface/people';
import api from '../api';
import { Commit } from 'vuex';

const state: IState = {
  pessoas: [],
};

const mutations = {
  setPeople(state: IState, people: IPerson[]) {
    state.pessoas = people;
  },
  addPerson(state: IState, person: IPerson) {
    state.pessoas = [...state.pessoas, person];
  },
  editPerson(state: IState, person: IPerson) {
    const index = state.pessoas.findIndex((p) => p.id === person.id);
    if (index !== -1) {
      state.pessoas[index] = person;
    }
  },
  deletePerson(state: IState, id: number) {
    state.pessoas = state.pessoas.filter((p) => p.id !== id);
  },
};

const actions = {
  async loadPeople({ commit }: { commit: Commit }) {
    try {
      const response = await api.getPeople();
      if (response.status === 200) {
        commit('setPeople', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    }
  },
  async addPerson({ commit }: { commit: Commit }, person: IPerson) {
    try {
      const response = await api.addPerson(person);
      if (response.status === 201) {
        commit('addPerson', response.data);
      }
    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
    }
  },
  async editPerson({ commit }: { commit: Commit }, person: IPerson) {
    try {
      const response = await api.editPerson(person);
      if (response.status === 200) {
        commit('editPerson', response.data);
      }
    } catch (error) {
      console.error('Erro ao editar pessoa:', error);
    }
  },
  async deletePerson({ commit }: { commit: Commit }, id: number) {
    try {
      const response = await api.deletePerson(id);
      if (response.status === 204) {
        commit('deletePerson', id);
      }
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    }
  },
};

const getters = {
  getPersonById: (state: IState) => (id: number) => {
    return state.pessoas.find((p) => p.id === id);
  },
};

export const peopleModule = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
