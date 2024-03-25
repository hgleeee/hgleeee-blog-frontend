<script lang="ts" setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import LoginPageBody from '@/components/LoginPageBody.vue'
import RightSideBody from '@/components/RightSideBody.vue'

const visible = ref(false);
const openLoginPage = function() {
  console.log("opened")
  visible.value = true;
}

const login = function() {
  console.log("로그인 시도!");
};
</script>

<template>
  <el-dialog v-model="visible" :width="400">
    <template #header="{ titleClass }">
      <div class="my-header">
        <h2 :class="titleClass">로그인</h2>
      </div>
    </template>
    <LoginPageBody />
  </el-dialog>

  <el-container class="main">
    <el-header>
      <TheHeader @click-login="openLoginPage"/>
    </el-header>
    <el-container class="sub-main">
      <el-aside class="left-sidebar">
        <TheSidebar />
      </el-aside>
      <el-container>
        <el-main>
          <div id="wrapper-inner" style="height: auto !important">
            <div class="center-view">
              <RouterView />
            </div>
          </div>
        </el-main>
        <el-footer>
          <TheFooter />
        </el-footer>
      </el-container>
      <el-aside class="right-sidebar">
        <RightSideBody />
      </el-aside>
    </el-container>
  </el-container>
</template>



<style scoped>
.main {
  min-height: 600px;
}
.main > .el-container {
  padding: 0 100px;
}
.main .el-header {
  padding: 0;
  display: inline-flex;
  position: relative;
  background: white;
  color: black;
}
.sub-main:nth-child(2) {
  border-right: 1px solid #aaaaaa;
} 
.main .el-aside {
  width: 260px;
  min-height: 600px;
  color: black;
  box-sizing: border-box;
  background: white;
}

.main .left-sidebar {
  width: 250px;
}

.main .right-sidebar {
  width: 300px;
}
.main .el-menu {
  border-right: none;
}
.main .el-main {
  padding: 20px 20px;
}

#wrapper-inner {
  display: flex;
}

.center-view {
  width: 100%;
}

</style>