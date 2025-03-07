// stores/CartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        isCartOpen: false,
    }),

    getters: {
        cartCount: (state) => {
            return state.items.reduce((total, item) => total + item.quantity, 0);
        },

        cartTotal: (state) => {
            return state.items.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0).toFixed(2);
        },

        groupedItems: (state) => {
            return state.items.reduce((grouped, item) => {
                const existingItem = grouped.find(i => i.id === item.id);
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    grouped.push({ ...item });
                }
                return grouped;
            }, []);
        }
    },

    actions: {
        addToCart(product, quantity = 1) {
            const item = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            };

            this.items.push(item);
            this.isCartOpen = true;
        },

        removeFromCart(productId) {
            this.items = this.items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
            }
        },

        clearCart() {
            this.items = [];
        },

        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
        }
    },

    persist: true
});