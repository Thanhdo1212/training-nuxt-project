import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('product', () => {
    const products = ref([])

    // Action để fetch data từ API
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            if (response.ok) {
                products.value = await response.json()
            } else {
                console.error('Failed to fetch products')
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    // Getter để lấy chi tiết sản phẩm theo ID
    const getProductById = (id) => {
        return products.value.find(item => item.id === id);
    }



    return { products, fetchProducts, getProductById }
})
