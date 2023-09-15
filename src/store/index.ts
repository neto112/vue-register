import { createStore } from "vuex";
import { peopleModule } from './people';
import { productsModule } from "./product";
// import orderModule from "./orderModule";
// import { orderItemsModule } from "./orderItems";
// import { customersModule } from "./customers";
import orderModule from "./orderModule"

const store = createStore({
  modules: {
    people: peopleModule,
    products: productsModule,
    orders: orderModule,
    // orders: ordersModule,
    // ordersItems: orderItemsModule,
    // customers: customersModule,
  }
})

export default store
