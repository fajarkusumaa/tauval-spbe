// export default defineNuxtRouteMiddleware((to) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     console.log("Token:", token, "| Path:", to.path);

//     const isPublicPage = ["/login"].includes(to.path);

//     if (!token && !isPublicPage) {
//       console.log("Redirecting to /login...");
//       return navigateTo("/login");
//     }

//     if (token && to.path === "/login") {
//       console.log("User already logged in, redirecting to /admin...");
//       return navigateTo("/admin");
//     }
//   }
// });
