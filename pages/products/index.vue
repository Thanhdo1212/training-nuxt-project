<template>
  <NuxtLayout>
    <v-app id="inspire">
      <v-main class="bg-grey-lighten-2">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="2">
              <v-card class="py-2 px-3">
                <v-text-field
                  placeholder="Search Product"
                  v-model="title"
                ></v-text-field>

                <v-radio-group v-model="sortBy">
                  <template v-slot:label>
                    <h3>Sort By:</h3>
                  </template>
                  <v-radio value="title">
                    <template v-slot:label>
                      <div>
                        By
                        <strong>title</strong>
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="price">
                    <template v-slot:label>
                      <div>
                        By
                        <strong>Price</strong>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
                <v-radio-group v-model="order">
                  <template v-slot:label>
                    <h3>Sort Order:</h3>
                  </template>
                  <v-radio value="ascending">
                    <template v-slot:label>
                      <div>
                        By
                        <strong>Ascending</strong>
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="deascending">
                    <template v-slot:label>
                      <div>
                        By
                        <strong>Deascending</strong>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-card>
            </v-col>
            <v-col cols="12" md="10">
              <v-row>
                <v-col
                  v-for="(product, index) in productStore.products"
                  :key="index"
                  cols="12"
                  md="4"
                  sm="6"
                  lg="3"
                >
                  <v-card
                    class="mx-auto"
                    :hover="true"
                    @click="router.push({ path: `/products/${product.id}` })"
                  >
                    <v-img height="200px" :src="product?.image" cover></v-img>

                    <v-card-title>{{ product?.title }}</v-card-title>

                    <v-card-subtitle>{{ product?.price }}</v-card-subtitle>
                    <v-card-actions class="d-flex justify-space-between">
                      <v-btn
                        color="orange-lighten-2"
                        @click="
                          router.push({ path: `/products/${product.id}` })
                        "
                      >
                        Detail
                      </v-btn>
                      <v-btn
                        color="blue-lighten-2"
                        @click.stop="openDialog(product)"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <!-- Sử dụng component Model -->
        <Modal
          :product="selectedProduct"
          v-model:dialogVisible="dialogVisible"
        />
      </v-main>
    </v-app>
  </NuxtLayout>
</template>

<script setup>
import { VCol } from "vuetify/components";
import { useProductStore } from "~/stores/ProductStore.js";
import Modal from "~/components/Modal.vue";
const sortBy = ref("");
const order = ref("ascending");
const title = ref("");
const router = useRouter();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const dialogVisible = ref(false);
const selectedProduct = ref(null);

const openDialog = (product) => {
  selectedProduct.value = product;
  dialogVisible.value = true;
};

// Fetch sản phẩm khi component mounted
productStore.fetchProducts();
const filteredProducts = computed(() => {
  if (title.value) {
    return [...products.value].filter((item) => {
      return title.value
        .toLocaleLowerCase()
        .split(" ")
        .every((v) => item.title.toLocaleLowerCase().includes(v));
    });
  } else return products.value;
});

const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};
const sortProducts = () => {
  if (order.value == "deascending") {
    products.value.sort(dynamicSort("-" + sortBy.value));
  } else {
    products.value.sort(dynamicSort(sortBy.value));
  }
};

watch(sortBy, () => {
  sortProducts();
});

watch(order, () => {
  sortProducts();
});
</script>
