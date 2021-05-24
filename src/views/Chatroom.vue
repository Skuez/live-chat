<template>
  <div class="chatroom container">
    <navbar />
    <p>Chatroom</p>
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import getUser from "../composables/getUser";

import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
  setup() {
    const router = useRouter();
    const { user } = getUser();

    watchEffect(() => {
      if (!user.value) router.push({ name: "Welcome" });
    });
  },
};
</script>

<style>
.chatroom {
  padding: 20px;
}
</style>
