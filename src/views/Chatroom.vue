<template>
  <div class="chatroom container">
    <navbar />
    <p>Chatroom</p>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style>
.chatroom {
  padding: 20px;
}
</style>
