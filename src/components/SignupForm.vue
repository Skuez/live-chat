<template>
  <h1>Sign Up</h1>
  <p class="error-message" v-if="error">{{ error }}</p>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="display name"
      v-model="displayName"
    />
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
    <button>Sign Up</button>
    <p>
      Already have an account?
      <span @click="$emit('changeForm')">Log in</span>.
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";

export default {
  emits: ["changeForm", "signup"],
  setup(props, context) {
    const { error, signup } = useSignup();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) context.emit("signup");
    };

    return { displayName, email, password, error, handleSubmit };
  },
};
</script>

<style>
span {
  cursor: pointer;
}
span:hover {
  filter: brightness(1.5);
}
.error-message {
  color: red;
  padding: 10px;
  border: 2px solid red;
  border-left: none;
  border-right: none;
}
</style>
