<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-semibold mb-6 text-gray-800">Budget Requests</h1>
    <button 
      @click="logout" 
      class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-4 py-2 mb-6 shadow-md"
    >
      Logout
    </button>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="border border-gray-300 px-4 py-3 text-left">ID</th>
            <th class="border border-gray-300 px-4 py-3 text-left">User ID</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Request Date</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Amount</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Reason</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Status</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="request in filteredBudgetRequests" 
            :key="request.idString" 
            class="hover:bg-gray-100 transition-colors"
          >
            <td class="border border-gray-300 px-4 py-3">{{ request.idString }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ request.userIdString }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ new Date(request.requestDate).toLocaleDateString() }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ request.amount }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ request.reason }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ request.status }}</td>
            <td class="border border-gray-300 px-4 py-3">
              <button 
                @click="viewDetails(request.idString)" 
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-3 py-1 shadow"
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const budgetRequests = ref([]);
    const user = JSON.parse(localStorage.getItem('user')); 
    const router = useRouter();

    const fetchBudgetRequests = async () => {
      try {
        let endpoint = 'http://localhost:3000/budget-requests';
        let params = {};

        if (user.levelNumber === 2) {
          params.status = 'pending';
        } else if (user.levelNumber === 3) {
          params.status = 'approved-line2';
        } else if (user.levelNumber === 4) {
          params.status = 'approved-line3';
        } else if (user.levelNumber === 5) {
          params.status = 'approved-line4';
        }

        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          params: params 
        });

        budgetRequests.value = response.data;
      } catch (error) {
        console.error('Error fetching budget requests:', error);
      }
    };

    const filteredBudgetRequests = computed(() => {
      return budgetRequests.value;
    });

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); 
      router.push({ name: 'Login' }); 
    };

    const viewDetails = (id) => {
      router.push({ name: 'CreateApproval', params: { id } });
    };

    onMounted(fetchBudgetRequests);

    return {
      filteredBudgetRequests,
      viewDetails,
      logout,
    };
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.min-w-full {
  padding: 1rem;
}
</style>
