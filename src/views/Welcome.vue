<template>
  <div class="welcome container">
    <p>Welcome</p>
    <signup-form
      @changeForm="handleForm"
      @signup="enterChat"
      v-if="showSignup"
    />
    <login-form @changeForm="handleForm" @login="enterChat" v-else />
  </div>
</template>

<script>
import { ref } from "vue";
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { useRouter } from "vue-router";

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const router = useRouter();
    const showSignup = ref(false);

    const handleForm = () => {
      showSignup.value = !showSignup.value;
    };

    const enterChat = () => {
      router.push({ name: "Chatroom" });
    };

    return { showSignup, handleForm, enterChat };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
/* form styles */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button {
  margin: 20px auto;
}
</style>
