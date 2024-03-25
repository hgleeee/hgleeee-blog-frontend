<script setup lang="ts">
import { ElCarousel } from 'element-plus'
import { type SimplePost, useSimplePostStore } from '@/stores/postInMainPage.js'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { type ComputedRef, onMounted, computed, watch } from 'vue';
import { dateExpression } from '@/stores/utils.js' 

const simplePostStore = useSimplePostStore();
const { bestFivePost, recentFivePost } = storeToRefs(simplePostStore);
onMounted(() => {
  simplePostStore.fetchBestFivePost();
  simplePostStore.fetchRecentFivePost();
});

const router = useRouter();
const redirectToPost = function(postId: number) {
  router.push(`/${postId}`);
}

</script>

<template>
  <main>
    <div class="block text-center" style="border-radius: 50px;">
      <el-carousel height="250px" :interval="10000" :autoplay="false" >
        <el-carousel-item v-for="item in bestFivePost" :key="item.postId" style="background-color: pink;">
          <!--<h3 class="small justify-center" text="2xl">{{ item.title }}</h3>-->
          <div class="wrapper">
            <div class="carousel-content" @click="redirectToPost(item.postId)">
              <h3 class="carousel-title">{{ item.title }}</h3>
              <div class="carousel-date">
                <font-awesome-icon icon="calendar-days" />
                {{ dateExpression(item.createdAt) }}
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="margin-top: 30px; ">
      <div class="subtitle">
        최근 쓰여진 글
      </div>
      <div style="display: flex; margin-top: 10px;">
        <div class="card-wrapper" v-for="item in recentFivePost" :key="item.postId">
          <div class="card-content" @click="redirectToPost(item.postId)">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-date">
              <font-awesome-icon icon="calendar-days" />
              {{ dateExpression(item.createdAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </main>
</template>

<style scoped>
main {
  width: 100%;
}
.subtitle {
  font-size: 18px;
  font-weight: bold;
  color: #FE2E64;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.wrapper {
  height: 200px; 
  margin: 25px 30px; 
  position: relative; 
  background-color: purple;
}
.carousel-content {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 15px 20px;
  max-width: 500px;
  word-break: break-all;
}
.carousel-title {
  color: #fff;
  font-size: 36px;
  font-weight: 600;
  line-height: 40px;
  margin: 10px 0;
}

.carousel-date {
  text-align: left;
  font-size: 13px;
  color: #F781BE;
  font-weight: 600;
  font-family: sans-serif;
}
.carousel-content:hover {
  cursor:pointer;
}
.carousel-content:hover .carousel-title {
  text-decoration: underline;
}


.card-wrapper {
  position: relative;
  left: 0;
  bottom: 0;
  background-color: #E6E0F8;
  border-radius: 15%;
  min-height: 150px;
  margin: 0 5px;
  width: 100%;
}

.card-content {
  position: absolute;
  left: 0;
  bottom: 10px;
  padding: 0 0 0 10px;
  word-break: break-all;
}

.card-title {
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 5px 0;
}

.card-date {
  font-weight: 400;
  font-size: 12px;
}
</style>
