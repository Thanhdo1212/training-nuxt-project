<!-- components/CartDrawer.vue -->
<template>
  <v-navigation-drawer
      v-model="cartStore.isCartOpen"
      location="right"
      temporary
      width="400"
  >
    <v-list>
      <v-list-item class="d-flex justify-space-between pa-4">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-cart</v-icon>
          <v-list-item-title class="text-h6">Your Cart</v-list-item-title>
        </div>
        <v-btn icon="mdi-close" @click="cartStore.toggleCart"></v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <div v-if="cartStore.cartCount === 0" class="pa-4 text-center">
        <v-icon size="64" color="grey-lighten-1">mdi-cart-outline</v-icon>
        <p class="text-body-1 mt-4">Your cart is empty</p>
        <v-btn
            color="primary"
            class="mt-4"
            prepend-icon="mdi-shopping"
            @click="cartStore.toggleCart"
            variant="outlined"
        >
          Continue Shopping
        </v-btn>
      </div>

      <div v-else>
        <v-list-item
            v-for="(item, index) in cartStore.groupedItems"
            :key="index"
            class="py-4"
        >
          <template v-slot:prepend>
            <v-img
                :src="item.image"
                width="60"
                height="60"
                cover
                class="bg-grey-lighten-4 rounded"
            ></v-img>
          </template>

          <v-list-item-title class="text-subtitle-1 font-weight-medium text-truncate">
            {{ item.title }}
          </v-list-item-title>

          <v-list-item-subtitle class="d-flex align-center mt-2">
            <v-icon color="primary" size="small" class="mr-1">mdi-currency-usd</v-icon>
            {{ item.price.toFixed(2) }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <div class="d-flex flex-column align-end">
              <div class="d-flex align-center mb-2">
                <v-btn
                    icon="mdi-minus"
                    variant="text"
                    size="small"
                    density="compact"
                    @click="decrementQuantity(item)"
                    :disabled="item.quantity <= 1"
                ></v-btn>
                <span class="mx-2">{{ item.quantity }}</span>
                <v-btn
                    icon="mdi-plus"
                    variant="text"
                    size="small"
                    density="compact"
                    @click="incrementQuantity(item)"
                ></v-btn>
              </div>
              <v-btn
                  color="error"
                  size="small"
                  variant="text"
                  density="compact"
                  prepend-icon="mdi-delete"
                  @click="cartStore.removeFromCart(item.id)"
              >
                Remove
              </v-btn>
            </div>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <div class="pa-4">
          <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-subtitle-1">Subtotal:</span>
            <span class="text-h6">${{ cartStore.cartTotal }}</span>
          </div>

          <v-btn
              color="primary"
              block
              class="mb-2"
              prepend-icon="mdi-cash-register"
              @click="checkout"
          >
            Checkout
          </v-btn>
          <v-btn
              variant="outlined"
              color="error"
              block
              prepend-icon="mdi-delete-sweep"
              @click="clearCartWithConfirmation"
          >
            Clear Cart
          </v-btn>
        </div>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useCartStore } from '~/stores/CartStore';

const cartStore = useCartStore();

const incrementQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1);
};

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1);
  }
};

const clearCartWithConfirmation = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart();
  }
};

const checkout = () => {
  alert(`Proceeding to checkout with a total of $${cartStore.cartTotal}`);
  // Here you would typically navigate to a checkout page
  // navigateTo('/checkout');
};
</script>