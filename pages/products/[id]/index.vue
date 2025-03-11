<!-- pages/products/[id].vue -->
<template>
  <NuxtLayout>
    <v-app>
      <v-main class="bg-grey-lighten-2">
        <v-container v-if="loading">
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <v-progress-circular
                  indeterminate
                  color="primary"
                  size="64"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else-if="product" class="py-8">
          <v-card>
            <v-row>
              <v-col cols="12" md="6">
                <v-img
                    :src="product.image"
                    height="400"
                    contain
                    class="bg-white"
                    :srcset="[
                        { src: 'image-small.jpg', width: 400 },
                        { src: 'image-medium.jpg', width: 800 },
                        { src: 'image-large.jpg', width: 1200 },
                        ]"
                    loading="lazy"
                    :placeholder="product.image"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" md="6">
                <v-card-item>
                  <v-card-title class="text-h4 mb-2">{{ product.title }}</v-card-title>
                  <v-chip
                      color="primary"
                      class="mb-4"
                  >
                    <v-icon start icon="mdi-tag"></v-icon>
                    {{ product.category }}
                  </v-chip>

                  <v-card-subtitle class="text-h5 text-primary mb-4 d-flex align-center">
                    <v-icon color="primary" class="mr-2">mdi-currency-usd</v-icon>
                    {{ product.price?.toFixed(2) }}
                    <v-chip color="success" class="ml-4" size="small" v-if="isInStock">
                      <v-icon start size="small">mdi-check-circle</v-icon>
                      In Stock
                    </v-chip>
                  </v-card-subtitle>

                  <!-- Rating Component with Icons -->
                  <div class="d-flex align-center mb-4">
                    <v-icon color="amber-darken-2" class="mr-1">mdi-star</v-icon>
                    <v-rating
                        :model-value="product.rating?.rate || 0"
                        color="amber"
                        density="compact"
                        half-increments
                        readonly
                        size="small"
                    ></v-rating>
                    <span class="text-grey-darken-1 ml-2">
                    <strong>{{ product.rating?.rate }}</strong>
                    ({{ product.rating?.count }} reviews)
                  </span>
                  </div>

                  <v-card-text class="text-body-1 mt-4">
                    <v-icon color="grey-darken-1" class="mr-2">mdi-information-outline</v-icon>
                    {{ product.description }}
                  </v-card-text>

                  <v-divider class="my-4"></v-divider>

                  <div class="d-flex align-center mb-6">
                    <v-icon color="grey-darken-1" class="mr-2">mdi-truck-delivery</v-icon>
                    <span>Free shipping on orders over $50</span>
                  </div>

                  <div class="d-flex align-center mb-6">
                    <v-icon color="grey-darken-1" class="mr-2">mdi-undo</v-icon>
                    <span>30-day return policy</span>
                  </div>

                  <v-card-actions>
                    <v-row>
                      <v-col cols="12" sm="5">
                        <div class="d-flex align-center">
                          <v-btn
                              icon="mdi-minus"
                              variant="outlined"
                              size="small"
                              @click="decrementQuantity"
                              :disabled="quantity <= 1"
                          ></v-btn>
                          <v-text-field
                              v-model="quantity"
                              type="number"
                              min="1"
                              max="10"
                              hide-details
                              density="compact"
                              class="mx-2"
                              style="width: 60px"
                              variant="outlined"
                              text-align="center"
                          ></v-text-field>
                          <v-btn
                              icon="mdi-plus"
                              variant="outlined"
                              size="small"
                              @click="incrementQuantity"
                              :disabled="quantity >= 10"
                          ></v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="7">
                        <v-btn
                            color="primary"
                            block
                            prepend-icon="mdi-cart"
                            @click="addToCart"
                            :loading="cartLoading"
                        >
                          Add to Cart
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card-item>
              </v-col>
            </v-row>
          </v-card>

          <!-- Product Information Tabs with Icons -->
          <v-card class="mt-6">
            <v-tabs v-model="activeTab" bg-color="primary">
              <v-tab value="description">
                <v-icon start>mdi-text-box-outline</v-icon>
                Description
              </v-tab>
              <v-tab value="specifications">
                <v-icon start>mdi-clipboard-list-outline</v-icon>
                Specifications
              </v-tab>
              <v-tab value="shipping">
                <v-icon start>mdi-truck-delivery-outline</v-icon>
                Shipping
              </v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="activeTab">
                <v-window-item value="description">
                  <div class="pa-4">
                    <h3 class="text-h6 mb-3 d-flex align-center">
                      <v-icon color="primary" class="mr-2">mdi-text-box</v-icon>
                      Product Description
                    </h3>
                    <p>{{ product.description }}</p>
                  </div>
                </v-window-item>

                <v-window-item value="specifications">
                  <div class="pa-4">
                    <h3 class="text-h6 mb-3 d-flex align-center">
                      <v-icon color="primary" class="mr-2">mdi-clipboard-list</v-icon>
                      Product Specifications
                    </h3>
                    <v-list>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-tag-outline"></v-icon>
                        </template>
                        <v-list-item-title>Category</v-list-item-title>
                        <v-list-item-subtitle>{{ product.category }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-currency-usd"></v-icon>
                        </template>
                        <v-list-item-title>Price</v-list-item-title>
                        <v-list-item-subtitle>${{ product.price?.toFixed(2) }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-identifier"></v-icon>
                        </template>
                        <v-list-item-title>Product Name</v-list-item-title>
                        <v-list-item-subtitle>{{ product.title }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-star-outline"></v-icon>
                        </template>
                        <v-list-item-title>Rating</v-list-item-title>
                        <v-list-item-subtitle>{{ product.rating?.rate }} out of 5</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-window-item>

                <v-window-item value="shipping">
                  <div class="pa-4">
                    <h3 class="text-h6 mb-3 d-flex align-center">
                      <v-icon color="primary" class="mr-2">mdi-truck-delivery</v-icon>
                      Shipping Information
                    </h3>

                    <v-list>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-package-variant-closed"></v-icon>
                        </template>
                        <v-list-item-title>Standard Delivery</v-list-item-title>
                        <v-list-item-subtitle>3-5 business days</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-rocket-launch"></v-icon>
                        </template>
                        <v-list-item-title>Express Delivery</v-list-item-title>
                        <v-list-item-subtitle>1-2 business days (additional fee)</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-gift"></v-icon>
                        </template>
                        <v-list-item-title>Free Shipping</v-list-item-title>
                        <v-list-item-subtitle>On all orders over $50</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-map-marker"></v-icon>
                        </template>
                        <v-list-item-title>Delivery Area</v-list-item-title>
                        <v-list-item-subtitle>Nationwide</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>

          <!-- Related Products Section with Icons -->
          <h2 class="text-h5 mt-8 mb-4 d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-tag-multiple</v-icon>
            Related Products
          </h2>
          <v-row>
            <v-col
                v-for="(relatedProduct, index) in relatedProducts"
                :key="index"
                cols="12"
                sm="6"
                md="3"
            >
              <v-card
                  class="mx-auto"
                  :hover="true"
                  @click="navigateToProduct(relatedProduct.id)"
              >
                <v-img height="150px" :src="relatedProduct.image" contain class="bg-white">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-card-title class="text-subtitle-1 text-truncate">{{ relatedProduct.title }}</v-card-title>
                <v-card-subtitle class="d-flex align-center">
                  <v-icon color="primary" size="small" class="mr-1">mdi-currency-usd</v-icon>
                  {{ relatedProduct.price?.toFixed(2) }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn
                      variant="text"
                      color="primary"
                      prepend-icon="mdi-eye"
                      @click.stop="navigateToProduct(relatedProduct.id)"
                  >
                    View Details
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else>
          <v-alert
              type="error"
              title="Product Not Found"
              text="The requested product could not be found."
              icon="mdi-alert-circle"
          ></v-alert>
          <v-btn color="primary" class="mt-4" prepend-icon="mdi-home" @click="navigateBack">
            Return to Products
          </v-btn>
        </v-container>
      </v-main>
    </v-app>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/stores/ProductStore';
import CartIcon from '~/components/CartIcon.vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const productId = parseInt(route.params.id);
const loading = ref(true);
const quantity = ref(1);
const product = ref(null);
const activeTab = ref('description');
const cartLoading = ref(false);
const isInStock = ref(true);
const cartStore = useCartStore();

onMounted(async () => {
  // Đảm bảo rằng products đã được tải
  if (products.value.length === 0) {
    await productStore.fetchProducts();
  }

  // Lấy sản phẩm theo ID từ store
  product.value = productStore.getProductById(productId);
  loading.value = false;
});

// Các sản phẩm liên quan (cùng category)
const relatedProducts = computed(() => {
  if (!product.value) return [];

  return products.value
      .filter(p => p.category === product.value.category && p.id !== productId)
      .slice(0, 7);
});

// Hàm điều hướng
const navigateBack = () => {
  router.push('/products');
};

const navigateToProduct = (id) => {
  navigateTo(`/products/${id}`);
};

// Xử lý số lượng
const incrementQuantity = () => {
  if (quantity.value < 10) {
    quantity.value++;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Thêm vào giỏ hàng (giả lập chức năng)
const addToCart = () => {
  cartLoading.value = true;

  // Add to cart with the specified quantity
  setTimeout(() => {
    cartStore.addToCart(product.value, quantity.value);
    cartLoading.value = false;

    // Reset quantity after adding to cart
    quantity.value = 1;
  }, 500);
};

// Chia sẻ sản phẩm
const shareProduct = () => {
  if (navigator.share) {
    navigator.share({
      title: product.value?.title,
      text: product.value?.description,
      url: window.location.href,
    })
        .catch((error) => console.log('Error sharing', error));
  } else {
    alert('Share functionality is not supported in your browser');
  }
};
</script>

<style scoped>
.v-card-title {
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>