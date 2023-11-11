<script lang="ts" setup>
import TheSidebarItem from '@/components/TheSidebarItem.vue'

interface ICategory {
    code: string,
    parentCategoryCode: any,
    name: string,
    level: number,
}
interface ICategories extends Array<ICategory> {};

const initCategories: ICategories = [
    {code: "100", parentCategoryCode: undefined, name: "Spring", level : 0},
    {code: "1000", parentCategoryCode: "100", name: "Spring-boot", level : 1},
    {code: "1001", parentCategoryCode: "100", name: "Spring-security", level : 1},
    {code: "200", parentCategoryCode: null, name: "Database", level : 0},
    {code: "2000", parentCategoryCode: "200", name: "MySQL", level : 1},
    {code: "2001", parentCategoryCode: "200", name: "Oracle", level : 1},
    {code: "300", parentCategoryCode: null, name: "Vuejs", level : 0},
    {code: "3000", parentCategoryCode: "300", name: "axios", level : 1},
    {code: "3001", parentCategoryCode: "300", name: "component-deeper", level : 1},
];

interface Category {
    code: string,
    name: string,
    parentCode: any,
}

interface ChildCategory extends Category {};

interface ParentCategory extends Category {
    children: Array<ChildCategory>;
}

const categories : Array<ParentCategory> = [];

for (let initCategory of initCategories) {
    if (initCategory.level === 0) {
        const category: ParentCategory = {
            code: initCategory.code, 
            name: initCategory.name,
            parentCode: null,
            children: [],
        }
        categories.push(category);
    }
}
for (let initCategory of initCategories) {
    if (initCategory.level === 1) {
        const child: ChildCategory = {
            code: initCategory.code, 
            name: initCategory.name,
            parentCode: initCategory.parentCategoryCode,
        }
        for (let parent of categories) {
            if (parent.code !== child.parentCode) { continue; }
            parent.children.push(child);
            break;
        }
    }
}

console.log(categories);

</script>
<template>
    <el-scrollbar>
        <el-menu>
            <el-sub-menu v-for="(category, idx) in categories" :key="idx" :index="idx">
                <template #title>
                    {{ category.name }}
                </template>
                <TheSidebarItem :subCategories="category.children" />
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<style scoped>
</style>
