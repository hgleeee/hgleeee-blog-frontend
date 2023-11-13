<script lang="ts" setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import LoginPageBody from '@/components/LoginPageBody.vue'

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
    <el-container>
      <el-aside>
        <TheSidebar />
      </el-aside>
      <el-container>
        <el-main>
          <el-scrollbar>
            <div class="main-view">
              <RouterView />
            </div>
          </el-scrollbar>
        </el-main>
        <el-footer>
          <TheFooter />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>



<style scoped>
.main {
  min-height: 800px;
}
.main > .el-container {
  padding: 0 100px;
}
.main .el-header {
  display: inline-flex;
  position: relative;
  background: skyblue;
  color: black;
}
.main .el-aside {
  width: 200px;
  min-height: 800px;
  color: black;
  background: skyblue;
}
.main .el-footer {
  background-color: sienna;
}
.main .el-menu {
  border-right: none;
}
.main .el-main {
  padding: 20px;
}

</style>