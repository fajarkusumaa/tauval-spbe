import { useToken, useUser } from "~/lib/token";

export default defineNuxtPlugin((nuxtApp) => {
  const token = useToken();
  const user = useUser();

  const api = $fetch.create({
    baseURL: "https://api.nuxt.com",
    onRequest({ request, options, error }) {
      if (token.value) {
        options.headers.set("Authorization", `Bearer ${token.value}`);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        token.value = null;
        user.value = null;
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
