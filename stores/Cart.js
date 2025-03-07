import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useProductStore } from "./product";

export const useCartStore = defineStore("cart", () => {
  const productStore = useProductStore();
  const { products } = storeToRefs(productStore); // Lấy danh sách sản phẩm từ store sản phẩm

  const cartContent = ref({}); // Lưu trạng thái giỏ hàng
  const theme = ref("light"); // Lưu trạng thái theme

  // 🔹 Danh sách sản phẩm trong giỏ hàng (định dạng lại dữ liệu)
  const formattedCart = computed(() => {
    return Object.keys(cartContent.value).map((productId) => {
      const product = cartContent.value[productId];
      const foundProduct = products.value.find((p) => p.id === productId);

      return {
        id: product.productId,
        image: foundProduct?.image || "",
        name: foundProduct?.name || "Unknown",
        price: foundProduct?.price || 0,
        quantity: product.quantity,
        cost: product.quantity * (foundProduct?.price || 0),
      };
    });
  });

  // 🔹 Tính tổng tiền giỏ hàng
  const total = computed(() => {
    return Object.keys(cartContent.value).reduce((acc, id) => {
      const product = products.value.find((p) => p.id === id);
      return product
        ? acc + product.price * cartContent.value[id].quantity
        : acc;
    }, 0);
  });

  // 🔹 Tính tổng số lượng sản phẩm trong giỏ hàng
  const productsTotal = computed(() => {
    return Object.keys(cartContent.value).reduce(
      (acc, id) => acc + cartContent.value[id].quantity,
      0
    );
  });

  // 🔹 Lấy theme hiện tại
  const getTheme = computed(() => theme.value);

  // 🔹 Thêm sản phẩm vào giỏ hàng
  const add = (productId) => {
    if (cartContent.value.hasOwnProperty(productId)) {
      cartContent.value[productId].quantity += 1;
    } else {
      cartContent.value[productId] = { productId, quantity: 1 };
    }
  };

  // 🔹 Giảm số lượng sản phẩm trong giỏ hàng
  const remove = (productId) => {
    if (!cartContent.value[productId]) return;
    cartContent.value[productId].quantity -= 1;

    if (cartContent.value[productId].quantity === 0) {
      delete cartContent.value[productId];
    }
  };

  // 🔹 Xóa sản phẩm khỏi giỏ hàng
  const removeProduct = (productId) => {
    delete cartContent.value[productId];
  };

  // 🔹 Chuyển đổi theme
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  return {
    cartContent,
    theme,
    formattedCart,
    total,
    productsTotal,
    getTheme,
    add,
    remove,
    removeProduct,
    toggleTheme,
  };
});
