<template>
  <div class="page" v-if="analysis">
    <div class="top">
      <div class="inner">
        <div class="title">{{ analysis.alphabet }}</div>
        <div class="mark">{{ analysis.vocabulary }} / {{ analysis.occupation }}</div>
        <div class="summarize">
          <div v-for="item in analysis.summarize" :key="item">{{ item }}</div>
          <div v-for="item in analysis.desc" :key="item">{{ item }}</div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="inner">
        <div class="characteristic" v-for="item in analysis.characteristic" :key="item.title">
          <div class="characteristic-title">{{ item.title }}</div>
          <div class="characteristic-desc">
            <div v-for="desc in item.desc" :key="desc">{{ desc }}</div>
          </div>
        </div>
      </div>

      <button class="again-btn" @click="handleAgain">重新测试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAnalysis, type Analysis } from '@/service/fapig';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const analysis = ref<Analysis>();

onMounted(async () => {
  if (route.query.answer) {
    analysis.value = await getAnalysis(route.query.answer as string);
    console.log(analysis.value);
  }
});

const handleAgain = () => {
  router.push('/index');
};
</script>

<style scoped>
.inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top {
  padding: 20px;
  background: var(--primary-color);
}
.title {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.5em;
}
.mark {
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-top: 20px;
}
.summarize {
  margin-top: 20px;
  color: #fff;
  font-size: 14px;
  text-indent: 2em;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.content {
  padding: 20px;
}

.characteristic-title {
  min-width: 120px;
  padding: 0 12px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid var(--color-purple);
  background: #fff;
  color: var(--color-pink);
  font-size: 14px;
  margin-bottom: 8px;
  box-sizing: border-box;
}
.characteristic-desc {
  font-size: 14px;
  line-height: 24px;
  text-indent: 2em;
}
.characteristic:not(:last-child) {
  margin-bottom: 20px;
}

.again-btn {
  margin: 0 auto;
  width: 120px;
  height: 40px;
  border-radius: 8px;
  background: var(--color-pink);
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>
