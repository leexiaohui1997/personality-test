<template>
  <div class="page">
    <div class="title">性 / 格 / 测 / 试</div>
    <button class="start-btn" @click="handleStart">开始测试</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleStart = () => {
  router.push('/index');
};
</script>

<style scoped>
.page {
  height: 100dvh;
  background: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 10px;
}
.is-mobile .title {
  font-size: 24px;
  letter-spacing: 5px;
}

.start-btn {
  margin-top: 40px;
  padding: 10px 20px;
  border-radius: 5px;
  background: #fff;
  color: var(--primary-color);
}
</style>
