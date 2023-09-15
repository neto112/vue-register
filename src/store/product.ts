import { IProduct, IProductsState } from '../interface/product';
import api from '../api';
import { Commit } from 'vuex';

const state: IProductsState = {
  products: [],
};

const mutations = {
  setProducts(state: IProductsState, products: IProduct[]) {
    state.products = products;
  },
  addProduct(state: IProductsState, product: IProduct) {
    state.products = [...state.products, product];
  },
  editProduct(state: IProductsState, updatedProduct: IProduct) {
    const index = state.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      state.products[index] = updatedProduct;
    }
  },
  deleteProduct(state: IProductsState, productId: number) {
    state.products = state.products.filter((p) => p.id !== productId);
  },
};

const actions = {
  async loadProducts({ commit }: { commit: Commit }) {
    try {
      const response = await api.getProducts();
      if (response.status === 200) {
        commit('setProducts', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  },
  async addProduct({ commit }: { commit: Commit }, product: IProduct) {
    try {
      const response = await api.addProduct(product);
      if (response.status === 201) {
        commit('addProduct', response.data);
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  },
  async editProduct({ commit }: { commit: Commit }, product: IProduct) {
    try {
      const response = await api.editProduct(product);
      if (response.status === 200) {
        commit('editProduct', response.data);
      }
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  },
  async deleteProduct({ commit }: { commit: Commit }, id: number) {
    try {
      const response = await api.deleteProduct(id);
      if (response.status === 204) {
        commit('deleteProduct', id);
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  },
};

const getters = {
  getProductById: (state: IProductsState) => (id: number) => {
    return state.products.find((p) => p.id === id);
  },
};

export const productsModule = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
