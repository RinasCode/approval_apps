<template>
  <div class="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
    <h2 class="text-2xl font-semibold mb-4 text-center">Edit Budget Request</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Department -->
      <div class="mb-4">
        <label for="departmentID" class="block mb-1 font-medium">Department</label>
        <select v-model="form.departmentIDString" required class="border border-gray-300 p-2 w-full rounded">
          <option value="dept1">dept1</option>
          <option value="dept2">dept2</option>
          <option value="dept3">dept3</option>
        </select>
      </div>

      <!-- Category -->
      <div class="mb-4">
        <label for="categoryID" class="block mb-1 font-medium">Category</label>
        <select v-model="form.categoryIDString" required class="border border-gray-300 p-2 w-full rounded">
          <option value="cat1">cat1</option>
          <option value="cat2">cat2</option>
        </select>
      </div>

      <!-- Request Date -->
      <div class="mb-4">
        <label for="requestDate" class="block mb-1 font-medium">Request Date</label>
        <input type="date" v-model="form.requestDate" required class="border border-gray-300 p-2 w-full rounded" />
      </div>

      <!-- Amount -->
      <div class="mb-4">
        <label for="amount" class="block mb-1 font-medium">Amount</label>
        <input type="number" v-model="form.amount" required class="border border-gray-300 p-2 w-full rounded" @input="updateTotalAmount" />
      </div>

      <!-- Total Amount -->
      <div class="mb-4">
        <label for="totalAmount" class="block mb-1 font-medium">Total Amount</label>
        <input type="text" :value="totalAmount" readonly class="border border-gray-300 p-2 w-full rounded bg-gray-100 cursor-not-allowed" />
      </div>

      <!-- Reason -->
      <div class="mb-4">
        <label for="reason" class="block mb-1 font-medium">Reason</label>
        <textarea v-model="form.reason" required class="border border-gray-300 p-2 w-full rounded" rows="4"></textarea>
      </div>

      <!-- Expected Date -->
      <div class="mb-4">
        <label for="expectedDate" class="block mb-1 font-medium">Expected Date</label>
        <input type="date" v-model="form.expectedDate" required class="border border-gray-300 p-2 w-full rounded" />
      </div>

      <!-- Attachment -->
      <div class="mb-4">
        <label for="attachment" class="block mb-1 font-medium">Attachment</label>
        <input type="file" @change="handleFileUpload" accept="image/*" class="border border-gray-300 p-2 w-full rounded" />
      </div>

      <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200">
        Update Request
      </button>
    </form>

    <router-link to="/budget-request" class="mt-4 block text-center text-blue-500 hover:underline">
      Back to Budget Requests
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    // Inisialisasi form dengan data default
    const form = ref({
      budgetRequestIdString: "",
      departmentIDString: "",
      categoryIDString: "",
      requestDate: "",
      amount: 0,
      reason: "",
      status: "pending",
      expectedDate: "",
      attachmentURL: "",
    });
    const selectedFile = ref(null);
    const totalAmount = ref(0);
    const route = useRoute();
    const router = useRouter();

    // Mengambil data Budget Request berdasarkan ID dari route params
    const fetchBudgetRequest = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        console.log("ID dari route params:", route.params.id);

        const response = await axios.get(
          `http://localhost:3000/budget-requests/${route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Data fetched:", response.data);

        // Mengisi form dengan data dari API
        form.value = {
          budgetRequestIdString: response.data.idString,
          departmentIDString: response.data.departmentIDString,
          categoryIDString: response.data.categoryIDString,
          requestDate: response.data.requestDate.split("T")[0], // Format tanggal
          amount: response.data.amount,
          reason: response.data.reason,
          status: response.data.status,
          expectedDate: response.data.expectedDate.split("T")[0], // Format tanggal
          attachmentURL: response.data.attachmentURL,
        };
        totalAmount.value = response.data.amount;
      } catch (error) {
        console.error("Error fetching budget request:", error);
        Toastify({
          text: "Error fetching budget request",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    };

    // Menangani file upload
    const handleFileUpload = (event) => {
      selectedFile.value = event.target.files[0];
    };

    // Update total amount ketika ada perubahan pada amount
    const updateTotalAmount = () => {
      totalAmount.value = form.value.amount;
    };

    // Menangani submit form
    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        if (selectedFile.value) {
          formData.append("attachment", selectedFile.value);
        }

        // Menambahkan semua data form ke formData
        for (const key in form.value) {
          formData.append(key, form.value[key]);
        }
        formData.append("totalAmount", totalAmount.value);

        const token = localStorage.getItem("token");

        const response = await axios.put(
          `http://localhost:3000/budget-requests/${form.value.budgetRequestIdString}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          Toastify({
            text: "Budget request updated successfully!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();
          router.push({ name: "BudgetRequestList" });
        } else {
          Toastify({
            text: "Update failed. Please try again.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
        }
      } catch (error) {
        console.error("Error updating budget request:", error);
        const errorMessage =
          error.response?.data?.message || "Update failed. Please try again.";
        Toastify({
          text: errorMessage,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    };

    // Menjalankan fetchBudgetRequest saat komponen dimuat
    onMounted(fetchBudgetRequest);

    return {
      form,
      selectedFile,
      totalAmount,
      handleFileUpload,
      updateTotalAmount,
      handleSubmit,
    };
  },
};
</script>
