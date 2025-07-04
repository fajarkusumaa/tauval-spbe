import { useToken, useUser } from "~/lib/token";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();
  const token = useToken();

  if (!token.value && !user.value) {
    user.value = null;
    token.value = null;
    
    return navigateTo("/login");
  }
});
