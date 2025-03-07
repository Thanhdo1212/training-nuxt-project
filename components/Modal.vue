<template>
  <v-dialog
    :model-value="dialogVisible"
    max-width="500"
    @update:model-value="$emit('update:dialogVisible', $event)"
  >
    <v-card>
      <v-card-title>{{ product?.title }}</v-card-title>
      <v-card-text>
        <v-img :src="product?.image" height="200px" contain></v-img>
        <p><strong>Price:</strong> {{ product?.price }}</p>
        <p>{{ product?.description }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Close"
          @click="$emit('update:dialogVisible', false)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  product: Object,
  dialogVisible: Boolean,
});

defineEmits(["update:dialogVisible"]);
</script>
