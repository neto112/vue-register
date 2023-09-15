<template>
  <div>
    <header class="custom-header">
      <div class="custom-header-content">
        <ul class="custom-header-list">
          <li>
            <button
              type="button"
              class="custom-button"
              @click="toggleNavigation"
            >
              <Menu class="menu-icon" />
            </button>
          </li>
          <li>
            <div class="custom-header-text">Seja bem vindo!</div>
          </li>
        </ul>
      </div>
    </header>

    <div
      v-show="showNavigation"
      class="custom-drawer"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <div class="custom-drawer-header">
        <h5 id="drawer-navigation-label" class="custom-drawer-title">Menu</h5>
        <button
          type="button"
          @click="toggleNavigation"
          class="custom-button close-button"
        >
          <Close class="close-icon" />
        </button>
      </div>
      <div>
        <button class="menu-item" @click="handleDashboard">
          <div class="menu-item-icon">
            <ViewDashboard />
          </div>
          <div class="menu-item-text">Dashboard</div>
        </button>
        <button class="menu-item" @click="handlePeople">
          <div class="menu-item-icon">
            <AccountMultiple />
          </div>
          <div class="menu-item-text">Lista de pessoa</div>
        </button>
        <button class="menu-item" @click="handleOrder">
          <div class="menu-item-icon">
            <Card />
          </div>
          <div class="menu-item-text">Lista de pedido</div>
        </button>
        <button class="menu-item" @click="handleProduct">
          <div class="menu-item-icon">
            <ListBox />
          </div>
          <div class="menu-item-text">Lista de produto</div>
        </button>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Menu from "vue-material-design-icons/Menu.vue";
import Close from "vue-material-design-icons/Close.vue";
import AccountMultiple from "vue-material-design-icons/AccountMultiple.vue";
import Card from "vue-material-design-icons/Cart.vue";
import ListBox from "vue-material-design-icons/ListBox.vue";
import ViewDashboard from "vue-material-design-icons/ViewDashboard.vue";

const showNavigation = ref(true);

const router = useRouter();

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value;
};

const handleDashboard = () => {
  router.push("/dashboard");
  showNavigation.value = !showNavigation.value;
};

const handlePeople = () => {
  router.push("/lista-pessoa");
  showNavigation.value = !showNavigation.value;
};

const handleOrder = () => {
  router.push("/lista-pedido");
  showNavigation.value = !showNavigation.value;
};

const handleProduct = () => {
  router.push("/lista-produto");
  showNavigation.value = !showNavigation.value;
};
</script>

<style lang="scss" scoped>
.custom-header {
  background-color: #007bff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-header-content {
  display: flex;
  align-items: center;
}

.custom-header-list {
  list-style: none;
  display: flex;
  align-items: center;
  padding-left: 0;
  margin: 8px;
}

.custom-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
}

.menu-icon {
  color: white;
  font-size: 24px;
  margin-right: 8px;
  animation: colorTransition 2s infinite alternate;
}

@keyframes colorTransition {
  0% {
    border-radius: 50%;
    padding: 8px;
    background: darkblue;
  }
  50% {
    border-radius: 50%;
    padding: 8px;
    background: rgb(110, 200, 231);
  }
  100% {
    border-radius: 50%;
    padding: 8px;
    background: darkblue;
  }
}

.close-icon {
  animation: closeTransition 2s infinite alternate;
}

@keyframes closeTransition {
  0% {
    border-radius: 50%;
    padding: 8px;
    background-color: #ff0000;
  }
  50% {
    border-radius: 50%;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  100% {
    border-radius: 50%;
    padding: 8px;
    background-color: #ff0000;
  }
}

.custom-header-text {
  margin-left: 16px;
  font-size: 18px;
  color: white;
}

.custom-drawer {
  background: #f8f8f8;
  width: 240px;
  position: fixed;
  top: 0;
  left: 0px;
  height: 100%;
  overflow-y: auto;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

.custom-drawer-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.custom-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.menu-item {
  cursor: pointer;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
}

.menu-item:focus {
  outline: none;
}

.menu-item .menu-item-icon {
  margin-right: 8px;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.custom-drawer-list {
  list-style: none;
  padding: 0;
}

.custom-link {
  text-decoration: none;
  color: #333333;
  display: flex;
  align-items: center;
  padding: 8px;
  transition: background 0.3s ease-in-out;
}

.custom-link:hover {
  background: #f0f0f0;
}

.custom-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.custom-link-text {
  font-size: 16px;
}
</style>