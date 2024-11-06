import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Approval from "../views/Approval.vue";
import UserList from "../views/UserList.vue";
import AddUser from "../views/AddUser.vue";
import BudgetRequestList from "../views/BudgetRequest.vue";
import AddBudget from "../views/AddBudget.vue";
import AllBudgetRequest from "../views/AllBudgetRequest.vue";
import CreateApproval from "../views/CreateApproval.vue";
import EditBudgetRequest from "../views/EditBudgetRequest.VUE";
import EditUser from "../views/EditUser.vue";

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.roleString === "admin";
};

const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return user != null;
};

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/approval",
    name: "Approval",
    component: Approval,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList,
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/add-user",
    name: "AddUser",
    component: AddUser,
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next();
      } else {
        next({ name: "UserList" });
      }
    },
  },
  {
    path: "/users/edit/:id",
    name: "EditUser",
    component: EditUser,
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next();
      } else {
        next({ name: "UserList" });
      }
    },
  },
  {
    path: "/budget-request",
    name: "BudgetRequestList",
    component: BudgetRequestList,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/all-budget-request",
    name: "AllBudgetRequest",
    component: AllBudgetRequest,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/create-approval/:id",
    name: "CreateApproval",
    component: CreateApproval,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/edit-budget-request/:id",
    name: "EditBudgetRequest",
    component: EditBudgetRequest,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/add-budget-request",
    name: "AddBudgetRequest",
    component: AddBudget,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
