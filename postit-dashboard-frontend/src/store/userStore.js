import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    token: sessionStorage.getItem("token") || null, // Use session storage to persist data
  }),
  actions: {
    async login(name, password) {
      try {
        const response = await axios.post("http://localhost:3000/user/login", {
          name,
          password,
        });

        this.user = { name };
        this.token = response.data.userId; // Make sure this matches the API response

        // ✅ Store in session storage
        sessionStorage.setItem("user", JSON.stringify(this.user));
        sessionStorage.setItem("token", this.token);

        return true;
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.error || "Login failed");
        return false;
      }
    },
    async register(name, password) {
      try {
        const response = await axios.post(
          "http://localhost:3000/user/register",
          {
            name,
            password,
          }
        );

        this.user = { name };
        this.token = response.data.userId;

        // ✅ Store in session storage
        sessionStorage.setItem("user", JSON.stringify(this.user));
        sessionStorage.setItem("token", this.token);

        return true;
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.error || "Registration failed");
        return false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;

      // ✅ Remove from session storage
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
  },
});
