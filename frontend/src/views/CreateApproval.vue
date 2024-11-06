<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Create Approval</h1>
    <form @submit.prevent="submitApproval">
      <div class="mb-4">
        <label for="budgetRequestIdString" class="block font-semibold"
          >Budget Request ID</label
        >
        <input
          v-model="approvalForm.budgetRequestIdString"
          type="text"
          id="budgetRequestIdString"
          class="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div class="mb-4">
        <label for="approvalDate" class="block font-semibold"
          >Approval Date</label
        >
        <input
          v-model="approvalForm.approvalDate"
          type="datetime-local"
          id="approvalDate"
          class="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div class="mb-4">
        <label for="decision" class="block font-semibold">Decision</label>
        <select
          v-model="approvalForm.decision"
          id="decision"
          class="border border-gray-300 p-2 rounded w-full"
          required
        >
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="comments" class="block font-semibold">Comments</label>
        <textarea
          v-model="approvalForm.comments"
          id="comments"
          class="border border-gray-300 p-2 rounded w-full"
          required
        ></textarea>
      </div>

      <button type="submit" class="bg-blue-500 text-white rounded px-4 py-2">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  data() {
    return {
      approvalForm: {
        budgetRequestIdString: this.$route.params.id || "",
        approvalDate: new Date().toISOString().slice(0, 16),
        decision: "",
        comments: "",
      },
    };
  },
  methods: {
    async submitApproval() {
      try {
        const response = await axios.post(
          "http://localhost:3000/approvals",
          this.approvalForm,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

  
        Toastify({
          text: "Approval created successfully!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
        }).showToast();

  
        this.$router.push({ name: "AllBudgetRequest" });
      } catch (error) {
        console.error("Error creating approval:", error);

        Toastify({
          text: "Failed to create approval.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
          stopOnFocus: true,
        }).showToast();
      }
    },
  },
};
</script>
