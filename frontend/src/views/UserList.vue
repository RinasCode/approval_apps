<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-semibold mb-6 text-center text-gray-800">
      Daftar Pengguna
    </h1>
    <button
      @click="logout"
      class="bg-red-300 text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-400 mb-4 float-right"
    >
      Logout
    </button>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">ID</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Nama</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Level</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Departemen</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Role</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.idString"
            class="border-b hover:bg-gray-100"
          >
            <td class="py-2 px-4 text-sm text-gray-700">{{ user.idString }}</td>
            <td class="py-2 px-4 text-sm text-gray-700">{{ user.nameString }}</td>
            <td class="py-2 px-4 text-sm text-gray-700">{{ user.emailString }}</td>
            <td class="py-2 px-4 text-sm text-gray-700">{{ user.levelNumber }}</td>
            <td class="py-2 px-4 text-sm text-gray-700">{{ user.departmentIDString }}</td>
            <td class="py-2 px-4 text-sm text-gray-700">{{ user.roleString }}</td>
            <td class="py-2 px-4">
              <button
                v-if="user.roleString !== 'admin'"
                @click="editUser(user.idString)"
                class="bg-green-500 text-white py-1 px-2 rounded shadow hover:bg-green-600"
              >
                Edit
              </button>
              <button
                v-if="user.roleString !== 'admin'"
                @click="deleteUser(user.idString)"
                class="bg-red-300 text-gray-800 py-1 px-2 rounded shadow hover:bg-red-400 ml-2"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      @click="addUser"
      class="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 mt-6"
    >
      Tambah Pengguna
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "UserList",
  setup() {
    const router = useRouter();
    const users = ref([]);

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        users.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const editUser = (idString) => {
      router.push(`/users/edit/${idString}`); 
    };

    const deleteUser = async (idString) => {
      try {
        await axios.delete(`http://localhost:3000/users/${idString}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    const addUser = () => {
      router.push("/add-user");
    };
    
    const logout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      router.push("/");
    };

    fetchUsers();

    return {
      users,
      editUser,
      deleteUser,
      addUser,
      logout
    };
  },
};
</script>
