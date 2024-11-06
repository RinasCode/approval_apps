<template>
  <div class="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
    <h2 class="text-2xl font-semibold mb-4 text-center">Add Budget Request</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="departmentID" class="block mb-1 font-medium"
          >Department</label
        >
        <select
          v-model="form.departmentIDString"
          required
          class="border border-gray-300 p-2 w-full rounded"
        >
          <option value="dept1">dept1</option>
          <option value="dept2">dept2</option>
          <option value="dept3">dept3</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="categoryID" class="block mb-1 font-medium">Category</label>
        <select
          v-model="form.categoryIDString"
          required
          class="border border-gray-300 p-2 w-full rounded"
        >
          <option value="cat1">cat1</option>
          <option value="cat2">cat2</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="requestDate" class="block mb-1 font-medium"
          >Request Date</label
        >
        <input
          type="date"
          v-model="form.requestDate"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>

      <div class="mb-4">
        <label for="amount" class="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          v-model="form.amount"
          required
          class="border border-gray-300 p-2 w-full rounded"
          @input="updateTotalAmount"
        />
      </div>

      <div class="mb-4">
        <label for="totalAmount" class="block mb-1 font-medium"
          >Total Amount</label
        >
        <input
          type="text"
          :value="totalAmount"
          readonly
          class="border border-gray-300 p-2 w-full rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div class="mb-4">
        <label for="reason" class="block mb-1 font-medium">Reason</label>
        <textarea
          v-model="form.reason"
          required
          class="border border-gray-300 p-2 w-full rounded"
          rows="4"
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="expectedDate" class="block mb-1 font-medium"
          >Expected Date</label
        >
        <input
          type="date"
          v-model="form.expectedDate"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>

      <div class="mb-4">
        <label for="attachment" class="block mb-1 font-medium"
          >Attachment</label
        >
        <input
          type="file"
          @change="handleFileUpload"
          accept="image/*"
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Submit Request
      </button>
    </form>

    <router-link
      to="/budget-request"
      class="mt-4 block text-center text-blue-500 hover:underline"
    >
      Back to Budget Requests
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  data() {
    return {
      form: {
        departmentIDString: "",
        categoryIDString: "",
        requestDate: "",
        amount: 0,
        reason: "",
        status: "pending",
        expectedDate: "",
        attachmentURL: "",
      },
      selectedFile: null,
    };
  },
  computed: {
    totalAmount() {
      return this.form.amount;
    },
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    updateTotalAmount() {
    },
    async handleSubmit() {
      try {
        const formData = new FormData();
        if (this.selectedFile) {
          formData.append("attachment", this.selectedFile);
        }

        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }
        formData.append("totalAmount", this.totalAmount);

        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:3000/budget-requests",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          Toastify({
            text: "Budget request submitted successfully!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();

          this.$router.push({ name: "BudgetRequestList" });
        } else {
          Toastify({
            text: "Submission failed. Please try again.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
        }
      } catch (error) {
        console.error("Error submitting budget request:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Submission failed. Please try again.";
        Toastify({
          text: errorMessage,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },
  },
};
</script>

