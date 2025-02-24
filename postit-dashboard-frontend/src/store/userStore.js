import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    token: sessionStorage.getItem("token") || null, // Use session storage to persist data
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
        this.token = response.data.user.id; // Make sure this matches the API response
        this.role = response.data.user.role;

        // ✅ Store in session storage
        sessionStorage.setItem("user", JSON.stringify(this.user));
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("role", this.role);

        // ✅ Simulate performance issue: Admin waits 5 seconds
        if (this.role === "admin") {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        return true;
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.error || "Login failed");
        return false;
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

        // ✅ Store in session storage
        sessionStorage.setItem("user", JSON.stringify(this.user));
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("role", this.role);

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
      this.role = "user"; // Reset role

      // ✅ Remove from session storage
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
    },
  },
});
