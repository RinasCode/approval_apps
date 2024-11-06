<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Daftar Budget Request</h1>
      <div>
        <button @click="addBudgetRequest" class="btn btn-primary mr-2">
          Tambah Request Budget
        </button>
        <button @click="logout" class="btn btn-secondary">Logout</button>
      </div>
    </div>
    <ul v-if="budgetRequests.length" class="space-y-4">
      <li
        v-for="request in budgetRequests"
        :key="request.idString"
        class="bg-white p-4 rounded shadow"
      >
        <p class="font-semibold">ID: {{ request.idString }}</p>
        <p>Amount: {{ request.amount }}</p>
        <p>Reason: {{ request.reason }}</p>
        <p>Status: {{ request.status }}</p>

        <div v-if="request.status === 'reject-line2' || request.status === 'reject-line3' || request.status === 'reject-line4' || request.status === 'reject-line5'">
          <p><strong>Comments: </strong>{{ request.comments || 'Cek budget Limit bulan ini' }}</p>
        </div>

        <button
          v-if="(request.status === 'reject-line2' || request.status === 'reject-line3' || request.status === 'reject-line4' || request.status === 'reject-line5') && isEmployeeLevelOne"
          @click="editBudgetRequest(request)"
          class="btn btn-warning mt-2"
        >
          Edit
        </button>
      </li>
    </ul>
    <p v-else>Tidak ada data budget request.</p>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const budgetRequests = ref([]);
    const router = useRouter();
    const isEmployeeLevelOne = ref(false);

    const fetchBudgetRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Pengguna mungkin belum login.");
        }

        const response = await axios.get("http://localhost:3000/budget-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          budgetRequests.value = response.data;
        } else {
          console.error("Data yang diterima bukan array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching budget requests:", error);
      }
    };

    const addBudgetRequest = () => {
      router.push("/add-budget-request");
    };

    const logout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/");
    };

    const editBudgetRequest = (request) => {
      router.push({
        name: "EditBudgetRequest",
        params: { id: request.idString },
      });
    };

    onMounted(() => {
      fetchBudgetRequests();
      const user = JSON.parse(localStorage.getItem("user"));
      isEmployeeLevelOne.value = user && user.levelNumber === 1;
    });

    return {
      budgetRequests,
      addBudgetRequest,
      logout,
      editBudgetRequest,
      isEmployeeLevelOne,
    };
  },
};
</script>
