<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue'
import SubCategoryUpdateItem from '@/components/SubCategoryUpdateItem.vue'
import CategoryInputItem from '@/components/CategoryInputItem.vue'
import { type Category, useCategoryStore, UPDATETYPE } from '@/stores/category.js'

const isHovered = ref(false);
const opened = ref(true);
const isEdit = ref(false);
const isAddSubState = ref(false);
const mode = ref('');

const props = defineProps(['category']);
const category = ref(props.category);
const categoryStore = useCategoryStore();

const handleAdd = () => {
  isAddSubState.value = true;
  opened.value = true;
  mode.value = UPDATETYPE.SUBADD;
}

const handleEdit = () => {
  isEdit.value = true;
  mode.value = UPDATETYPE.MAINEDIT;
}

const handleDelete = () => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    categoryStore.deleteCategory(category.value.code);
  }
}

const handleUpperMove = () => {
  categoryStore.editCategoryOrder(category.value.code, category.value.order-1);
}

const handleBelowMove = () => {
  categoryStore.editCategoryOrder(category.value.code, category.value.order+1);
}

const closeInput = () => {
  isEdit.value = false;
  if (opened.value && category.value.subCategories.length === 0) {
    opened.value = false;
  }
}

type order = 'order';
const compare = (order: order) => (a: Category, b: Category) => {
    if (a[order] < b[order]) {
        return -1;
    }
    if (a[order] > b[order]) {
        return 1;
    }
    return 0;
};

onBeforeMount(() => {
  category.value.subCategories.sort(compare('order'));
}),

watch(props, () => {
  category.value = props.category;
  category.value.subCategories.sort(compare('order'));
})

const handleHover = () => {
  isHovered.value = true;
}
const handleLeave = () => {
  isHovered.value = false;
}

</script>

<template>
  <div>
    <div v-if="!isEdit" class="category-item" :class="{ 'hovered' : isHovered }" @mouseover="handleHover" @mouseleave="handleLeave">
      <div class="info-item">
        <div class="label-btn" @click="opened = !opened">
          <font-awesome-icon v-if="category.subCategories.length === 0" icon="circle" style="font-size: 7px; padding-left: 4px;" />
          <font-awesome-icon v-else-if="!opened" icon="caret-down" rotation=270 />
          <font-awesome-icon v-else icon="caret-down" />
        </div>
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </div>
        <div class="content-box">
          <span>{{ category.name }}</span>
        </div>
      </div>
      <div class="btn-item" :class="{ 'hidden' : !isHovered }">
        <button v-if="!isAddSubState" class="btn-rename" @click="handleAdd()">추가</button>
        <button class="btn-rename" @click="handleEdit()">수정</button>
        <button class="btn-delete" @click="handleDelete()">삭제</button>
        <button class="btn-upper" :class="{'disabled-btn-upper' : category.order === 0 }" @click="handleUpperMove()">
          <font-awesome-icon icon="caret-up" />
        </button> 
        <button class="btn-below" :class="{'disabled-btn-below' : category.order === categoryStore.categories.length-1 }" @click="handleBelowMove()">
          <font-awesome-icon icon="caret-down" />
        </button>
      </div>
    </div>
    <div v-else>
      <CategoryInputItem 
        :name="category.name" :mode="mode" :code="category.code"
        @close-input="closeInput()" />
    </div>
    <div class="list-sub" :class="{ 'hidden' : !opened }">
      <div class="sub-item" v-for="(subCategory, idx) of category.subCategories" :key="idx">
        <SubCategoryUpdateItem :sub-category="subCategory" :parent-code="category.code" />
      </div>
      <CategoryInputItem v-if="isAddSubState"
        :mode="mode" :code="category.code" @close-input="isAddSubState = false" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$default-color: #F2F2F2;
$border-color: #F8E0F1;

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 1px $border-color solid;
  background-color: white;
  font-size: 18px;
  font-weight: bold;
  height: 52px;

  &>.info-item {
    display: flex;
    align-items: center;
    &>.label-btn {
      margin: 0 2px 0 1px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
    }
    &>.menu-icon {
      padding: 10px;
    }
  }

  &>.btn-item {
    margin-right: 10px;
  }
  & button {
    border-radius: 2px;
    margin: 0 2px;
    padding: 2px 10px;
    font-size: 14px;
    background-color: white;
    border: $border-color 1px solid;

    &:hover {
      color: white;
      background-color: #FA5858;
    }
  }
}

.disabled-btn-upper {
  color: gray;
  cursor: not-allowed;
}

.disabled-btn-below {
  color: gray;
  cursor: not-allowed;
}

.list-sub {
  margin-left: 40px;
}

.hovered {
  color: $default-color;
  background-color: #F5A9BC;
}

.hidden {
  display: none;
}

</style>