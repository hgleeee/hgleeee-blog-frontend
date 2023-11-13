<script lang="ts" setup>
const props = defineProps(['subCategories']);
const subCategories = props.subCategories;
</script>

<template>
    <el-menu-item v-for="(subCategory, idx) in subCategories" :key="idx">
        <a :href="`posts?category=${subCategory.code}`"> {{ subCategory.name }} </a>
    </el-menu-item>
    <!-- <a href="#">{{ props.category.name }} / {{ props.category.code }}</a> -->
</template>

<style scoped>
a {
    margin: 0 10px;
    text-decoration: none;
    color: black;
    text-decoration: solid;
}
a:visited {
  text-decoration: none;
}
a:focus {
  color: red;
}
</style>
