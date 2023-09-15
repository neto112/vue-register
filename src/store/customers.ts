// import { ICustomer, ICustomerState } from '../interface/order';
// import api from '../api';
// import { Commit } from 'vuex';

// const state: ICustomerState = {
//   clientes: [],
// };

// const mutations = {
//   setClientes(state: ICustomerState, clientes: ICustomer[]) {
//     state.clientes = clientes;
//   },
//   addCliente(state: ICustomerState, cliente: ICustomer) {
//     state.clientes = [...state.clientes, cliente]
//   },
//   editCliente(state: ICustomerState, cliente: ICustomer) {
//     const index = state.clientes.findIndex(c => c.id === cliente.id);
//     if (index !== -1) {
//       state.clientes[index] = cliente;
//     }
//   },
//   deleteCliente(state: ICustomerState, clienteId: number) {
//     state.clientes = state.clientes.filter(c => c.id !== clienteId);
//   },
// };

// const actions = {
//   async loadClientes({ commit }: { commit: Commit }, pedidoId: number) {
//     try {
//       const response = await api.getCustomers(pedidoId);
//       commit('setClientes', response.data);
//     } catch (error) {
//       console.error('Erro ao buscar os clientes:', error);
//     }
//   },
//   async addCliente({ commit }: { commit: Commit }, { pedidoId, cliente }: { pedidoId: number, cliente: ICustomer }) {
//     try {
//       const response = await api.addCustomer(pedidoId, cliente);
//       commit('addCliente', response.data);
//     } catch (error) {
//       console.error('Erro ao criar um cliente:', error);
//     }
//   },
//   async editCliente({ commit }: { commit: Commit }, { pedidoId, cliente }: { pedidoId: number, cliente: ICustomer }) {
//     try {
//       const response = await api.editCustomer(pedidoId, cliente);
//       commit('editCliente', response.data);
//     } catch (error) {
//       console.error('Erro ao editar um cliente:', error);
//     }
//   },
//   async deleteCliente({ commit }: { commit: Commit }, { pedidoId, clienteId }: { pedidoId: number, clienteId: number }) {
//     try {
//       await api.deleteCustomer(pedidoId, clienteId);
//       commit('deleteCliente', clienteId);
//     } catch (error) {
//       console.error('Erro ao excluir um cliente:', error);
//     }
//   },
// };

// export const customersModule = {
//   state,
//   mutations,
//   actions,
//   namespaced: true,
// };
