<script setup lang="ts">
import CategoryUpdateItem from '@/components/CategoryUpdateItem.vue'
import CategoryInputItem from '@/components/CategoryInputItem.vue'
import { useCategoryStore, UPDATETYPE } from '@/stores/category.js'
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();
const { sortedCategories } = storeToRefs(categoryStore);

const showAddInput = ref(false);

const submitAndFetchData = function() {
    categoryStore.submit();
}

</script>

<template>
  <div id="container">
    <h3>카테고리 관리</h3>
    <div class="wrapper">
        <strong>카테고리를 자유롭게 수정할 수 있습니다.</strong>
        <div id="category-app">
            <div class="category-bundle">
                <CategoryUpdateItem v-for="(category, idx) of sortedCategories" :key="idx" :category="category" />
            </div>
            <div class="category-add">
                <CategoryInputItem v-if="showAddInput" :mode="UPDATETYPE.MAINADD" @close-input="showAddInput = false" />
                <div v-else class="add-box">
                    <div class="add-btn" @click="showAddInput = true">
                        <font-awesome-icon icon="square-plus" />
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-area">
            <button @click="submitAndFetchData()">변경사항 저장</button>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$default-color: #F2F2F2;
$border-color: #F8E0F1;

#container {
    padding: 40px;
    &>h3 {
        margin: 0 0 20px;
    }
    &>.wrapper {
        box-sizing: border-box;
        border: 1px solid #F7819F;
        padding: 25px 30px 0;
    }
}

#category-app {
    margin: 20px 0 50px;
    padding: 8px;
    border-radius: 1px;
    background: #FBEFFB;
}

.add-box {
    padding: 2px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 52px;
    font-size: 16px;
    border: 1px dotted black;
    background-color: white;

    &>.add-btn {
        font-size: 45px;
        color: #A4A4A4;
        display: flex;
        align-items: center;

        &>* {
            padding: 0;
            vertical-align: 0;
        }

        &:hover {
            cursor: pointer;
            color: #585858;
        }
    }
}

.submit-area {
    padding: 20px;
    display: flex;
    justify-content: right;
    align-items: center;

    &>button {
        margin-right: 20px;
        width: 150px;
        height: 40px;
        font-size: 14px;
        font-weight: bold;
        color: #585858;
        border-color: $border-color;
        border-radius: 5px;

        &:hover {
            background-color: $border-color; 
            cursor: pointer;
        }
    }
}

</style>