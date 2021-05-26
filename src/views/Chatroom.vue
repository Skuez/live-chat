<template>
  <div class="chatroom container">
    <navbar />
    <chat-window />
    <new-chat-form />
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import getUser from "../composables/getUser";
import NewChatForm from "../components/NewChatForm.vue";
import ChatWindow from "../components/ChatWindow.vue";

import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar, NewChatForm, ChatWindow },
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
