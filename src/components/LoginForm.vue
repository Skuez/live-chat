<template>
  <h1>Log In</h1>
  <p class="error-message" v-if="error">{{ error }}</p>
  <form @submit.prevent="handleSubmit">
    <input
      autocomplete="on"
      type="email"
      required
      placeholder="email"
      v-model="email"
    />
    <input
      autocomplete="on"
      type="password"
      required
      placeholder="password"
      v-model="password"
    />
    <button>Log in</button>
    <p>
      Don't have an account?
      <span @click="$emit('changeForm')">Sign up</span>.
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";

export default {
  emits: ["changeForm", "login"],
  setup(props, context) {
    const { error, login } = useLogin();

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) context.emit("login");
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style scoped>
span {
  cursor: pointer;
}
span:hover {
  filter: brightness(1.5);
}
</style>
