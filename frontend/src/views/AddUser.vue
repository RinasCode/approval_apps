<template>
  <div
    v-if="isAdmin"
    class="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10"
  >
    <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">
      Tambah Pengguna
    </h1>
    <form @submit.prevent="addUser" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
        <input v-model="form.nameString" type="text" id="name" class="w-full px-4 py-2 border rounded-lg" required />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="form.emailString" type="email" id="email" class="w-full px-4 py-2 border rounded-lg" required />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input v-model="form.passwordString" type="password" id="password" class="w-full px-4 py-2 border rounded-lg" required />
      </div>
      <div>
        <label for="level" class="block text-sm font-medium text-gray-700">Level</label>
        <select v-model="form.levelNumber" id="level" class="w-full px-4 py-2 border rounded-lg" required>
          <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
        </select>
      </div>
      <div>
        <label for="department" class="block text-sm font-medium text-gray-700">Departemen</label>
        <select v-model="form.departmentIDString" id="department" class="w-full px-4 py-2 border rounded-lg" required>
          <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
        </select>
      </div>
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
        <input v-model="form.roleString" type="text" id="role" class="w-full px-4 py-2 border rounded-lg" required />
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        Tambah Pengguna
      </button>
      <button type="button" @click="goBack" class="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 mt-4">
        Back to User List
      </button>
    </form>
  </div>
  <p v-else class="text-center text-red-500">Unauthorized access</p>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AddUser",
  setup() {
    const router = useRouter();
    const isAdmin = ref(false);
    const form = ref({
      nameString: "",
      emailString: "",
      passwordString: "",
      levelNumber: 1,
      departmentIDString: "",
      roleString: "employee",
    });

    const departments = ["dept1", "dept2", "dept3"];
    const levels = [1, 2, 3, 4, 5];

    const checkAdminRole = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      isAdmin.value = user && user.roleString === "admin";
    };

    const addUser = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:3000/users/register", form.value, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.push({ name: "UserList" });
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };

    const goBack = () => {
      router.push({ name: "UserList" });
    };

    onMounted(() => {
      checkAdminRole();
    });

    return { form, addUser, isAdmin, goBack, departments, levels };
  },
};
</script>
