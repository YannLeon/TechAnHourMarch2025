import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    token: sessionStorage.getItem("token") || null,
    role: sessionStorage.getItem("role") || "user",
  }),
  actions: {
    async login(name, password) {
      try {
        const response = await axios.post("http://localhost:3000/user/login", {
          name,
          password,
        });

        this.user = { name };
        this.token = response.data.user.id;
        this.role = response.data.user.role;

        sessionStorage.setItem("user", JSON.stringify(this.user));
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("role", this.role);

        return { success: true };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message:
            error.response?.data?.error || "Login failed. Please try again.",
        };
      }
    },

    async register(name, password, role = "user") {
      try {
        const response = await axios.post(
          "http://localhost:3000/user/register",
          {
            name,
            password,
            role,
          }
        );

        this.user = { name };
        this.token = response.data.user.id;
        this.role = response.data.user.role;

        sessionStorage.setItem("user", JSON.stringify(this.user));
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("role", this.role);

        return { success: true };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message:
            error.response?.data?.error ||
            "Registration failed. Please try again.",
        };
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.role = "user";

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
    },
  },
});
