<!-- layouts/default.vue -->
<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>
        <div @click="router.push('/products')" style="cursor: pointer" class="d-flex align-center">
          <v-icon class="mr-2">mdi-shopping</v-icon>
          Shop App
        </div>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-heart-outline"></v-btn>
      <cart-icon />
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <cart-drawer />
  </v-app>
</template>

<script setup>
import CartDrawer from '~/components/CartDrawer.vue';
import CartIcon from '~/components/CartIcon.vue';

const router = useRouter();
</script>