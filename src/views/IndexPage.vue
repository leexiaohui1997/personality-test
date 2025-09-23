<template>
  <div class="wrapper" v-if="questions.length > 0">
    <div class="question">
      <div class="question-index">{{ currentIndex + 1 }}/{{ questions.length }}</div>
      <div class="question-content">{{ currentQuestion.q }}</div>
      <div class="question-indicator">
        <div
          class="question-indicator-item"
          v-for="i in questions.length"
          :key="i"
          :class="{ active: answers.has(i - 1) }"
        ></div>
      </div>
    </div>

    <div class="answer">
      <div
        class="answer-item"
        :class="{ active: answers.get(currentIndex) === currentQuestion[`i${key}`] }"
        v-for="(key, index) in ['a', 'b'] as const"
        :key="key"
        @click="onClickAnswer(currentQuestion[`i${key}`])"
      >
        <div class="answer-item-title">{{ index + 1 }}</div>
        <div class="answer-item-content">{{ currentQuestion[key] }}</div>
        <div class="answer-item-check">
          <i class="fa fa-check"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getQuestions } from '@/service/fapig';
import type { Question } from '@/service/fapig';

const questions = ref<Question[]>([]);
const currentIndex = ref(0);
const currentQuestion = computed(() => questions.value[currentIndex.value]!);
const answers = ref<Map<number, string>>(new Map());

const disableTimer = ref<number | null>(null);
const onClickAnswer = (answer: string) => {
  if (answers.value.get(currentIndex.value) === answer) {
    return;
  }
  answers.value.set(currentIndex.value, answer);
  disableTimer.value = setTimeout(() => {
    disableTimer.value = null;
    nextQuestion();
  }, 300);
};

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  }
};

onMounted(async () => {
  questions.value = await getQuestions();
});
</script>

<style scoped>
.question {
  padding: 20px;
  background: var(--primary-color);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.question-index {
  font-size: 14px;
  margin-bottom: 16px;
}
.question-content {
  font-size: 20px;
  line-height: 32px;
  height: 64px;
}
.question-indicator {
  gap: 8px;
  display: flex;
  margin-top: 16px;
}
.question-indicator-item {
  width: 10px;
  height: 10px;
  background: var(--color-purple-dark);
  border: 1px solid var(--color-pink);
}
.question-indicator-item.active {
  background: var(--color-pink);
}

.answer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
}
.answer-item {
  width: 300px;
  padding: 12px 8px;
  border: 1px solid var(--color-purple);
  background: #fff;
  border-radius: 20px;
  display: flex;
  line-height: 24px;
  padding-right: 30px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.answer-item.active {
  background: var(--color-pink);
  color: #fff;
  border-color: var(--color-pink);
}
.answer-item-title {
  padding: 0 8px;
}
.answer-item-check {
  position: absolute;
  right: 0px;
  width: 30px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.answer-item:not(.active) .answer-item-check {
  display: none;
}
</style>
