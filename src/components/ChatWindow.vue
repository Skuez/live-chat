<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div
      @scroll="handleScroll"
      v-if="documents"
      class="messages"
      ref="messages"
    >
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }} ago</span>
        <span class="name">{{ doc.user }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
  <button @click="loadMoreMessages">Load more messages</button>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated } from "vue";
import { ref } from "vue";

export default {
  setup() {
    const { documents, error } = getCollection("messages");

    const howManyMessages = ref(15);
    const prevHeight = ref(null);
    const loadedFromDatabase = ref(true);

    const loadMoreMessages = () => {
      loadedFromDatabase.value = false;
      howManyMessages.value += 15;
    };

    const formattedDocuments = computed(() => {
      return documents.value
        .map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        })
        .slice(
          documents.value.length - howManyMessages.value >= 0
            ? documents.value.length - howManyMessages.value
            : 0,
          documents.value.length
        );
    });

    // auto-scroll
    const handleScroll = () => {
      if (messages.value.scrollTop == 0) {
        loadedFromDatabase.value = false;
        prevHeight.value = messages.value.scrollHeight;
        loadMoreMessages();
      }
    };

    const messages = ref(null);
    onUpdated(() => {
      if (loadedFromDatabase.value) {
        messages.value.scrollTop = messages.value.scrollHeight;
      } else {
        messages.value.scrollTop =
          messages.value.scrollHeight - prevHeight.value;
        loadedFromDatabase.value = true;
      }
    });

    return {
      documents,
      error,
      formattedDocuments,
      messages,
      handleScroll,
      loadMoreMessages,
    };
  },
};
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
