import { defineStore } from 'pinia'
import axios from 'axios'
import { type Ref, ref, computed, onBeforeMount } from 'vue'
import cloneDeep from 'lodash/cloneDeep';

export type Category = {
  "code": string,
  "name": string,
  "level": number,
  "order": number,
  "subCategories": Array<SubCategory>,
}

export type SubCategory = {
    "code": string,
    "name": string,
    "level": number,
    "order": number,
}

export const UPDATETYPE = {
    MAINADD: 'mainAdd',
    SUBADD: 'subAdd',
    MAINEDIT: 'mainEdit',
    SUBEDIT: 'subEdit',
} as const;
type UPDATETYPE = typeof UPDATETYPE[keyof typeof UPDATETYPE];


export const useCategoryStore = defineStore('category', () => {
    const permCategories: Ref<Category[]> = ref([]);
    const categories: Ref<Category[]> = ref([]);

    onBeforeMount(() => {
        console.log("hello!!");
        fetchData();
    });
    
    const sortedCategories = computed(() => {
        const sortedCategories = [...categories.value];
        sortedCategories.sort((a: Category, b: Category) => {
            return a.order - b.order;
        })
        return sortedCategories;
    })

    const sortedPermCategories = computed(() => {
        const sortedPermCategories = [...permCategories.value];
        sortedPermCategories.sort((a: Category, b: Category) => {
            return a.order - b.order;
        })
        return sortedPermCategories;
    });
    
    function fetchData() {
        axios.get('/api/category/categories')
            .then((result) => {
                permCategories.value = cloneDeep(result.data);
                categories.value = cloneDeep(result.data);
            })
            .catch(() => {
                alert('카테고리 불러오기에 실패하였습니다.')
            })
    };
    function addCategory(name: string) {
        const newCategory: Category = {
            "code": "10" + categories.value.length,
            "name": name,
            "level": 0,
            "order": categories.value.length,
            "subCategories": [],
        }
        categories.value.push(newCategory);
    };
    function addSubCategory(parentCode: string, name: string) {
        for (const category of categories.value) {
            if (category.code !== parentCode) continue;
            const newSubCategory: SubCategory = {
                "code": category.code + category.subCategories.length,
                "level": 1,
                "order": category.subCategories.length,
                "name": name,
            }
            category.subCategories.push(newSubCategory)
        }
    };
    function chooseCategory(code: string) {
        for (const category of categories.value) {
            if (category.code !== code) continue;
            return category;
        }
        return null;
    };
    function chooseSubCategory(code: string) {
        for (const category of categories.value) {
            for (const subCategory of category.subCategories) {
                if (subCategory.code !== code) continue;
                return subCategory;
            }
        }
        return null;
    };

    function editCategoryName(code: string, newName: string) {
        const category = chooseCategory(code);
        if (category === null) {
            alert("카테고리가 null이네요");
            return;
        }
        category.name = newName;
    };
    function editSubCategoryName(code: string, newName: string) {
        const subCategory = chooseSubCategory(code);
        if (subCategory === null) {
            alert("카테고리가 null이네요");
            return;
        }
        subCategory.name = newName;
    };

    function editCategoryOrder(code: string, newOrder: number) {
        if (newOrder < 0 || newOrder >= categories.value.length) {
            alert("그 쪽으로는 움직일 수 없음!!");    
            return;
        }
        const chosenCategory = chooseCategory(code);
        if (chosenCategory === null) {
            alert("카테고리가 null이네요");
            return;
        }
        const originOrder = chosenCategory.order;
        if (originOrder < newOrder) {
            for (const category of categories.value) {
                if (category.order > originOrder && category.order <= newOrder) {
                    category.order--;
                }
            }
        } else if (originOrder > newOrder) {
            for (const category of categories.value) {
                if (category.order < originOrder && category.order >= newOrder) {
                    category.order++;
                }
            }
        }
        chosenCategory.order = newOrder;
    };
    function editSubCategoryOrder(code: string, parentCode: string, newOrder: number) {
        const parentCategory = chooseCategory(parentCode);
        if (parentCategory === null) {
            alert('부모 카테고리가 null이네요');
            return;
        }
        if (newOrder < 0 || newOrder >= parentCategory.subCategories.length) {
            alert("그 쪽으로는 움직일 수 없음!!");    
            return;
        }
        const chosenCategory = chooseSubCategory(code);
        if (chosenCategory === null) {
            alert("카테고리가 null이네요");
            return;
        }
        const originOrder = chosenCategory.order;
        
        const subCategories = chooseCategory(parentCode)!.subCategories;
        if (originOrder < newOrder) {
            for (const subCategory of subCategories as SubCategory[]) {
                if (subCategory.order > originOrder && subCategory.order <= newOrder) {
                    subCategory.order--;
                }
            }
        } else if (originOrder > newOrder) {
            for (const subCategory of subCategories as SubCategory[]) {
                if (subCategory.order < originOrder && subCategory.order >= newOrder) {
                    subCategory.order++;
                }
            }
        }
        chosenCategory.order = newOrder;
    };

    function deleteCategory(code: string) {
        for (let i = 0; i < categories.value.length; ++i) {
            if (categories.value[i].code !== code) continue;
            const removed: Category = categories.value[i];
            categories.value.splice(i, 1);
            for (const category of categories.value) {
                if (category.order > removed.order) {
                    category.order--;
                }
            }
            return;
        }
        for (const category of categories.value) {
            for (let i = 0; i < category.subCategories.length; ++i) {
                if (category.subCategories[i].code !== code) continue;
                const removed: SubCategory = category.subCategories[i];
                category.subCategories.splice(i, 1);
                for (const subCategory of category.subCategories) {
                    if (subCategory.order > removed.order) {
                        subCategory.order--;
                    }
                }
                return;
            }
        }
    };
    function submit() {
        axios.post('/api/category/update', {
            'categories': categories.value,
        })
        .then(() => {
            alert("카테고리 변경이 완료되었습니다.");
            fetchData();
        })
        .catch(() => console.log('error!'));
    };

    return { permCategories, categories, sortedCategories, sortedPermCategories, 
        fetchData, addCategory, addSubCategory, editCategoryName, editSubCategoryName, editCategoryOrder, editSubCategoryOrder, deleteCategory, submit }
});