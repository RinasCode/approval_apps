<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Approval List</h1>
    <button @click="logout" class="btn btn-red mb-4">Logout</button>
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Budget Request ID</th>
          <th>User ID</th>
          <th>Approval Date</th>
          <th>Decision</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="approval in approvals" :key="approval.idString">
          <td>{{ approval.idString }}</td>
          <td>{{ approval.budgetRequestIdString }}</td>
          <td>{{ approval.userIdString }}</td>
          <td>{{ new Date(approval.approvalDate).toLocaleString() }}</td>
          <td>{{ approval.decision }}</td>
          <td>{{ approval.comments }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approvals: [],
    };
  },
  mounted() {
    this.fetchApprovals();
  },
  methods: {
    async fetchApprovals() {
      try {
        const response = await fetch("http://localhost:3000/approvals");
        this.approvals = await response.json();
      } catch (error) {
        console.error("Error fetching approvals:", error);
      }
    },
    logout() {
      localStorage.removeItem("user");

      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped></style>
