<script lang="ts" setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import LoginPageBody from '@/components/LoginPageBody.vue'
import RightSideBody from '@/components/RightSideBody.vue'
import ChangeProfilePageBody from '@/components/ChangeProfilePageBody.vue'
import { useModalStateStore, loginPageVisible, changeProfilePageVisible } from './stores/modalState.js'

const modalStateStore = useModalStateStore();
const { modalState } = storeToRefs(modalStateStore);

</script>

<template>
  <el-container class="main">
    <el-header>
      <TheHeader/>
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


    <el-dialog v-model="modalState.modalStateMap[loginPageVisible]" :width="400" :lock-scroll="false" >
      <template #header="{ titleClass }">
        <div class="my-header">
          <h2 :class="titleClass">로그인</h2>
        </div>
      </template>
      <LoginPageBody />
    </el-dialog>
    <el-dialog v-model="modalState.modalStateMap[changeProfilePageVisible]" :width="800" :height="600" :lock-scroll="false" :destroy-on-close=true>
      <template #header="{ titleClass }">
        <div class="my-header">
          <h2 :class="titleClass">프로필 사진 변경</h2>
        </div>
      </template>
      <ChangeProfilePageBody />
    </el-dialog>
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