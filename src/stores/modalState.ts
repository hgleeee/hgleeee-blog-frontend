import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";

export const loginPageVisible: string = 'loginPageVisible';
export const changeProfilePageVisible: string = 'changeProfilePageVisible';
const visibleArray = [loginPageVisible, changeProfilePageVisible];

class ModalState {
    // public modalStateMap: Map<string, boolean>;
    public modalStateMap: Record<string, boolean>;

    constructor() {
        // this.modalStateMap = reactive(new Map<string, boolean>());
        // for (const key in visibleArray) {
        //     this.modalStateMap.set(key, false);
        // }
        this.modalStateMap = {
            [loginPageVisible]: false,
            [changeProfilePageVisible]: false,
        };
    }

    private resetState() {
        // this.modalStateMap.forEach((_, key) => {
        //     this.modalStateMap.set(key, false);
        // })
        for (const key of visibleArray) {
            this.modalStateMap[key] = false; // 변경된 부분
        }
    }

    public openLoginPage() {
        this.resetState();
        // this.modalStateMap.set(loginPageVisible, true);
        this.modalStateMap[loginPageVisible] = true;
    }

    public openChangeProfilePage() {
        this.resetState();
        // this.modalStateMap.set(changeProfilePageVisible, true);
        this.modalStateMap[changeProfilePageVisible] = true;
    }

    // public loginPageOpened() {
    //     return this.modalStateMap.get(loginPageVisible);
    // }

    // public changeProfilePageOpened() {
    //     return this.modalStateMap.get(changeProfilePageVisible);
    // }

    public closeModal() {
        this.resetState();
    }
}

export const useModalStateStore = defineStore('modalState', () => {
    const modalState = ref(new ModalState());

    const loginPageOpened = computed(() => 
        // modalState.modalStateMap.get(loginPageVisible)
        modalState.value.modalStateMap[loginPageVisible]
    );

    const changeProfilePageOpened = computed(() => 
        // modalState.modalStateMap.get(changeProfilePageVisible)
        modalState.value.modalStateMap[changeProfilePageVisible]
    );
    
    return { modalState, loginPageOpened, changeProfilePageOpened };
})