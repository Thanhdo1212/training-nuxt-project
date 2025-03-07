<!-- components/CartIcon.vue -->
<template>
  <div class="cart-icon-wrapper">
    <v-btn icon @click="cartStore.toggleCart">
      <v-badge
          :content="cartStore.cartCount.toString()"
          :model-value="cartStore.cartCount > 0"
          color="error"
          location="top end"
          offset-x="3"
          offset-y="3"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/CartStore';

const cartStore = useCartStore();
</script>

<style scoped>
.cart-icon-wrapper {
  margin-right: 8px;
}
</style>