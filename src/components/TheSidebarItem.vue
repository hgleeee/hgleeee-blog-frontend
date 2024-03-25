<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = defineProps(['subCategories']);
const subCategories = ref(props.subCategories);

watch(props, () => {
  subCategories.value = props.subCategories;
})
</script>

<template>
  <el-menu-item-group>
    <el-menu-item v-for="(subCategory, idx) in subCategories" :key="idx" :index="idx">
        <a :href="`/posts/${subCategory.code}`"> {{ subCategory.name }} </a>
    </el-menu-item>
  </el-menu-item-group>
    <!-- <a href="#">{{ props.category.name }} / {{ props.category.code }}</a> -->
</template>

<style scoped>
a {
    margin: 0 10px;
    text-decoration: none;
    color: black;
    text-decoration: solid;
    width: 100%;
}
a:visited {
  text-decoration: none;
}
a:focus {
  color: red;
}
</style>
