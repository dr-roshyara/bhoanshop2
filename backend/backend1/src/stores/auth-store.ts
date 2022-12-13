/* eslint-disable prettier/prettier */
// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { LoginUser } from "@/types/store";
import type { NewUser } from "@/types/store";
import type { LoggedUser } from "@/types/store";
// import type LoggedUser from "@/types/store";
import axios from "axios";
import { router } from "@/router/index";
//Read this page to understand authnication via axios
// https://upmostly.com/vue-js/how-to-use-vue-with-pinia-to-set-up-authentication
// https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial#router-index-js
export const useAuthStore = defineStore("user", {
  state: () => {
    return {
      returnUrl: "",
      // for data that is not yet loaded
      loggedInUser: null as LoggedUser | null,
      errorMessage: "Either user email or password is wrong." as string,
      loginError: false as Boolean,
    };
  },
  getters: {
    getReturnUrl(): any {
      return this.returnUrl;
    },
  },
  actions: {
    async login(logUser: LoginUser) {
      const LOGIN_URL = import.meta.env.VITE_API_URL + "/login";
      console.log(LOGIN_URL);
      try {
        const response = await axios.post(LOGIN_URL, {
          email: logUser.email,
          password: logUser.password,
        });
        // console.log(response.data.user);
        this.$state.loggedInUser = response.data.user;
        this.updateLocalStorage(response);

        await router.push({ path: "/dashboard" });
        return {
          user: response.data.user,
          loginError: this.$state.loginError,
          errorMessage: "",
        };
      } catch (error) {
        this.$state.loginError = true;
        return this.showLoginError();
        throw error;
      }
    },
    updateLocalStorage(response: any) {
      if (this.$state.loggedInUser) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // const user = localStorage.getItem("user");
        // console.log(user);
      } else {
        localStorage.removeItem("user");
      }
    },
    showLoginError() {
      // this.$state.loginError = true;
      // console.log(this.$state.errorMessage);
      return {
        errorMessage: this.$state.errorMessage,
        loginError: this.$state.loginError,
      };
    },
    //sign up function
    async register(user: NewUser) {
      const REGISTER_URL = import.meta.env.VITE_API_URL + "/register";
      console.log(REGISTER_URL);
      try {
        const response = await axios.post(REGISTER_URL, user);
        console.log(response.data.user);
        this.$state.loggedInUser = response.data.user;
        console.log(this.$state.loggedInUser);
        this.updateLocalStorage(response);

        await router.push({ path: "/dashboard" });
        return {
          user: response.data.user,
          loginError: this.$state.loginError,
          errorMessage: "",
        };
      } catch (error) {
        this.$state.loginError = true;
        return this.showLoginError();
        throw error;
      }

      // await router.push({ path: "/dashboard" });
      return {
        user: user,
        loginError: this.$state.loginError,
        errorMessage: "",
      };
    },
    //logout
    async logout() {
      localStorage.clear(); // always clean localStorage before reset the state
      this.$reset();
      await router.push({ path: "/login" });
    },
  },
});