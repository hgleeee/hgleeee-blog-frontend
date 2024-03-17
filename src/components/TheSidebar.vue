<script lang="ts" setup>
import TheSidebarItem from '@/components/TheSidebarItem.vue'
import { useCategoryStore } from '@/stores/category.js'
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();
const { sortedPermCategories } = storeToRefs(categoryStore);


</script>
<template>
    <el-scrollbar>
        <el-menu>
            <el-sub-menu v-for="(category, idx) in sortedPermCategories" :key="idx" :index="idx">
                <template #title>
                    {{ category.name }}
                </template>
                <TheSidebarItem :subCategories="category.subCategories" />
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<style scoped>
.el-scrollbar {
    width: 250px;
}
</style>
