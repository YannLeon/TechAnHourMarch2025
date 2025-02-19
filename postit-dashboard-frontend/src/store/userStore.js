import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null, // In this demo, we use user ID as a token
  }),
  actions: {
    async login(name, password) {
      try {
        const response = await axios.post("http://localhost:3000/user/login", {
          name,
          password,
        });
        this.user = { name };
        this.token = response.data.id;
        return true;
      } catch (error) {
        console.log(error);
        alert(error.response.data.error);
        return false;
      }
    },
    async register(name, password) {
      try {
        await axios.post("http://localhost:3000/user/register", {
          name,
          password,
        });
        return true;
      } catch (error) {
        alert(error.response.data.error);
        return false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
