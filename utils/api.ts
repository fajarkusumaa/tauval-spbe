// utils/api.ts atau langsung di script setup
export async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await useFetch<{ token: string }>(
      "https://api-kamu.com/login",
      {
        method: "POST",
        body: {
          email,
          password,
        },
        // headers: { "Content-Type": "application/json" }, // biasanya otomatis
      }
    );

    if (error.value) throw error.value;

    const token = data.value?.token;

    if (!token) {
      throw new Error("Token tidak ditemukan dalam respons");
    }

    // Simpan token ke localStorage
    localStorage.setItem("token", token);

    return token;
  } catch (err) {
    console.error("Login gagal:", err);
    throw err;
  }
}
