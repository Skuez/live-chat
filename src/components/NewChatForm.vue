<template>
  <form>
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
      :disabled="toggleDisabled"
      ref="textarea"
    ></textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";

export default {
  setup() {
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");

    const message = ref("");
    const toggleDisabled = ref(false);
    const textarea = ref(null);

    const handleSubmit = async () => {
      message.value = message.value.trim();
      if (!message.value) return;
      toggleDisabled.value = true;
      const chat = {
        user: user.value.displayName,
        message: message.value,
        createdAt: timestamp(),
      };

      await addDoc(chat);
      if (!error.value) message.value = "";
      toggleDisabled.value = false;
      textarea.value.focus();
    };

    return { message, handleSubmit, error, toggleDisabled, textarea };
  },
};
</script>

<style scoped>
form {
  margin: 10px;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
.error {
  text-align: center;
  color: #ff2a58;
  font-size: 12px;
  padding: 10px 0;
}
</style>
