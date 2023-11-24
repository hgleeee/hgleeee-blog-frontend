<script lang="ts" setup>
import { type Ref, ref, watch } from 'vue'
import CategoryInputItem from '@/components/CategoryInputItem.vue'
import { type SubCategory, useCategoryStore ,UPDATETYPE } from '@/stores/category.js'

const isHovered = ref(false);
const isEdit= ref(false);
const mode = ref('');

const categoryStore = useCategoryStore();
const props = defineProps(['subCategory', 'parentCode']);
const subCategory: Ref<SubCategory> = ref(props.subCategory);
const parentCode = props.parentCode;

const handleHover = () => {
  isHovered.value = true;
}
const handleLeave = () => {
  isHovered.value = false;
}

const handleEdit = () => {
  isEdit.value = true;
  mode.value = UPDATETYPE.SUBEDIT;
}

const handleDelete = () => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    categoryStore.deleteCategory(subCategory.value.code);
  }
}

const handleUpperMove = () => {
  categoryStore.editSubCategoryOrder(subCategory.value.code, parentCode, subCategory.value.order-1);
}

const handleBelowMove = () => {
  categoryStore.editSubCategoryOrder(subCategory.value.code, parentCode, subCategory.value.order+1);
}

watch(props, () => {
  subCategory.value = props.subCategory;
})

</script>

<template>
  <div>
    <div v-if="!isEdit" class="sub-category-item" :class="{ 'hovered' : isHovered }" @mouseover="handleHover" @mouseleave="handleLeave">
      <div class="info-item">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </div>
        <div class="content-box">
          {{ subCategory.name }}
        </div>
      </div>
      <div class="btn-item" :class="{ 'hidden' : !isHovered }">
        <button class="btn-rename" @click="handleEdit()">수정</button>
        <button class="btn-delete" @click="handleDelete()">삭제</button>
        <button class="btn-upper" @click="handleUpperMove()">
          <font-awesome-icon icon="caret-up" />
        </button> 
        <button class="btn-below" @click="handleBelowMove()">
          <font-awesome-icon icon="caret-down" />
        </button>
      </div>
    </div>
    <div v-else>
      <CategoryInputItem 
        :name="subCategory.name" :mode="mode" :code="subCategory.code"
        @close-input="isEdit = false" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$default-color: #F2F2F2;
$border-color: #F8E0F1;

.sub-category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 1px $border-color solid;
  background-color: white;
  font-size: 17px;
  height: 52px;
  &>.info-item {
    display: flex;
    align-items: center;
    &>.menu-icon {
      padding: 10px;
    }
  }

  &>.btn-item {
    margin-right: 30px;
  }
  & button {
    border-radius: 2px;
    margin: 0 2px;
    padding: 2px 10px;
    font-size: 14px;
    background-color: white;
    border: $border-color 1px solid;

    &:hover {
      cursor: pointer;
      color: white;
      background-color: #FA5858;
    }
  }
}

.hovered {
  color: $default-color;
  background-color: #F5A9BC;
}

.hidden {
  display: none;
}

</style>