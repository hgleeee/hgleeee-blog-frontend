<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const remainTime = ref(0);
const router = useRouter();

onMounted(() => {
  remainTime.value = 5;
  const timer = setInterval(() => {
    if (remainTime.value > 0) {
      remainTime.value--;
    } else {
      clearInterval(timer);
      router.push('/');
    }
  }, 1000)
})
</script>

<template>
  <div id="wrapper">
    <a>허용되지 않은 접근입니다.</a>
    <a>{{ remainTime }}초 뒤에 홈으로 이동됩니다.</a>
  </div>
</template>

<style lang="scss" scoped>
#wrapper {
  a {
    display: block;
    padding: 10px 5px;
    font-size: 20px;
    font-weight: 600;
    color: #FF5675;
  }
}
</style>