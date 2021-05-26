import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import { auth } from "../firebase/config";

// auth guard
const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
};

// auth guard
const isLoggedIn = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next();
  } else {
    next({ name: "Chatroom" });
  }
};

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: isLoggedIn,
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
