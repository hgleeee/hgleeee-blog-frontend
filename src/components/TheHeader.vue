<script lang="ts" setup>
import { ref } from 'vue'
import TheHeaderItem from '@/components/TheHeaderItem.vue'
const mainCategories = [
  {name: 'Blog', link: '/blog'}, 
  {name: 'Project', link: '/project'}, 
  {name: 'About Me', link: '/about'}
];
const login = {name: '로그인', link: '/login'}
</script>

<template>
  <el-row>
    <el-col :span="20" class="left-part">
      <h1 id="logo">
        <a href="/">홈 버튼</a>
      </h1>
      <ul class="d-inline-flex">
        <li v-for="(category, idx) in mainCategories" :key="idx">
          <TheHeaderItem :category="category"/>
        </li>
      </ul>
    </el-col>
    <el-col :span="4" class="right-part">
      <ul>
        <li>
          <TheHeaderItem :category="login"/>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:visited {
  text-decoration: none;
}
a:hover {
  color: red;
}
a:focus {
  color: red;
}
h1 {
  font-size: 1rem;
}
.el-row {
  width: 1410px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
}
.el-col {
  display: flex;
}
.left-part {
  justify-content: space-between;
}
.right-part {
  justify-content: flex-end;
}
ul {
  margin: 0;
  padding: 0;
  height: 100%;
  align-items: center;
  justify-content: center;
}
li {
  height: 100%;
  display: inline-flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
  background-color: aquamarine;
}
</style>

