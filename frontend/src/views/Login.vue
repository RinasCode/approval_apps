<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-semibold text-gray-700">Login</h1>
        <p class="text-gray-500">Login to manage your budget requests</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-4 relative">
          <label for="email" class="block text-gray-700 mb-2">Email</label>
          <div class="flex items-center border rounded-lg p-2">
            <i class="fas fa-envelope text-gray-400 mr-2"></i>
            <input
              type="text"
              v-model="emailString"
              id="email"
              required
              placeholder="Enter your email"
              class="w-full outline-none text-gray-700"
            />
          </div>
        </div>
        <div class="mb-6 relative">
          <label for="password" class="block text-gray-700 mb-2"
            >Password</label
          >
          <div class="flex items-center border rounded-lg p-2">
            <i class="fas fa-lock text-gray-400 mr-2"></i>
            <input
              type="password"
              v-model="passwordString"
              id="password"
              required
              placeholder="Enter your password"
              class="w-full outline-none text-gray-700"
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  data() {
    return {
      emailString: "",
      passwordString: "",
    };
  },
  methods: {
  async handleLogin() {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        emailString: this.emailString,
        passwordString: this.passwordString,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      Toastify({
        text: "Login successful!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();

      const user = response.data.user;
      if (user.roleString === "admin") {
        this.$router.push({ name: "UserList" });
      } else if (user.roleString === "employee") {
        if (user.levelNumber === 1) {
          this.$router.push({ name: "BudgetRequestList" });
        } else if ([2,3,4,5].includes(user.levelNumber)) {
          this.$router.push({ name: "AllBudgetRequest" });
        } 
      }
    } catch (error) {
      console.error("Login failed:", error);
      Toastify({
        text: "Login failed. Please try again.",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
    }
  },
}
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

body {
  background-image: url("https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080");
  background-size: cover;
  background-position: center;
}
</style>
