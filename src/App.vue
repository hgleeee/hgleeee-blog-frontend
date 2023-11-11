<script lang="ts" setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheSidebar from '@/components/TheSidebar.vue'


</script>


<template>
  <el-container class="main">
    <el-header>
      <TheHeader />
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
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.main .el-aside {
  width: 200px;
  min-height: 800px;
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
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