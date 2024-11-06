<template>
  <div v-if="isAdmin" class="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Edit Pengguna</h1>
    <form @submit.prevent="updateUser" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
        <input
          v-model="form.nameString"
          type="text"
          id="name"
          class="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.emailString"
          type="email"
          id="email"
          class="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <div>
        <label for="level" class="block text-sm font-medium text-gray-700">Level</label>
        <select
          v-model="form.levelNumber"
          id="level"
          class="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option v-for="level in levels" :key="level" :value="level">
            {{ level }}
          </option>
        </select>
      </div>
      <div>
        <label for="department" class="block text-sm font-medium text-gray-700">Departemen</label>
        <select
          v-model="form.departmentIDString"
          id="department"
          class="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option v-for="department in departments" :key="department" :value="department">
            {{ department }}
          </option>
        </select>
      </div>
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
        <input
          v-model="form.roleString"
          type="text"
          id="role"
          class="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Update Pengguna
      </button>
      <button
        type="button"
        @click="goBack"
        class="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 mt-4"
      >
        Back to User List
      </button>
    </form>
  </div>
  <p v-else class="text-center text-red-500">Unauthorized access</p>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "EditUser",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userId = ref(route.params.id); 
    const levels = [1, 2, 3, 4, 5];
    const departments = ["dept1", "dept2", "dept3"];
    const form = ref({
      nameString: "",
      emailString: "",
      levelNumber: 1,
      departmentIDString: "",
      roleString: "employee",
    });

    const isAdmin = ref(false);

    const checkAdminRole = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      isAdmin.value = user && user.roleString === "admin";
    };

    const fetchUserData = async () => {
      if (!userId.value) {
        console.error("User ID not found");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:3000/users/${userId.value}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        form.value = { ...data }; 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const updateUser = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:3000/users/${userId.value}`, 
          form.value,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        router.push({ name: "UserList" }); 
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    const goBack = () => {
      router.push({ name: "UserList" });
    };

    onMounted(() => {
      checkAdminRole(); 
      if (isAdmin.value) {
        fetchUserData();  
      }
    });

    return {
      form,
      levels,
      departments,
      updateUser,
      isAdmin,
      goBack,
    };
  },
};
</script>
