import { createStore } from "vuex";
import { peopleModule } from './people';
import { productsModule } from "./product";
import orderModule from "./orders";

const store = createStore({
  modules: {
    people: peopleModule,
    products: productsModule,
    orders: orderModule
  }
})

export default store
