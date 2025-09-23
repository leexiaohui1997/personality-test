<template>
  <div>IndexPage</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getQuestions } from '@/service/fapig';
import type { Question } from '@/service/fapig';

const questions = ref<Question[]>([]);

onMounted(async () => {
  questions.value = await getQuestions();
  console.log(questions.value, 1);
});
</script>

<style scoped></style>
