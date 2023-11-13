<script lang="ts" setup>
const props = defineProps(['category']);
const categoryName = props.category.name;
const categoryLink = props.category.link;


</script>

<template>
    <div id="wrapper">
        <a v-if="categoryLink !== null" :href="categoryLink">{{ categoryName }}</a>
        <a v-else @click="$emit('clickLogin')">{{ categoryName }}</a>
    </div>
</template>

<style scoped>
a {
    margin: 0 10px;
    text-decoration: none;
    color: black;
    text-decoration: solid;
    text-shadow: 1px 1px 5px gray;
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
#wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 10px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;
}
</style>
