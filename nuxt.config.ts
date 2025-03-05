// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/styles"],
  build: {
    transpile: ["vuetify"],
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@ant-design-vue/nuxt"],
  antd: {
    // Options
  },
});
