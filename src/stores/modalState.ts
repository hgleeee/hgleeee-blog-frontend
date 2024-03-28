import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";

export const loginPageVisible: string = 'loginPageVisible';
export const changeProfilePageVisible: string = 'changeProfilePageVisible';
const visibleArray = [loginPageVisible, changeProfilePageVisible];

class ModalState {
    public modalStateMap: Record<string, boolean>;

    constructor() {
        this.modalStateMap = {
            [loginPageVisible]: false,
            [changeProfilePageVisible]: false,
        };
    }

    private resetState() {
        for (const key of visibleArray) {
            this.modalStateMap[key] = false; // 변경된 부분
        }
    }

    public openLoginPage() {
        this.resetState();
        this.modalStateMap[loginPageVisible] = true;
    }

    public openChangeProfilePage() {
        this.resetState();
        this.modalStateMap[changeProfilePageVisible] = true;
    }

    public closeModal() {
        this.resetState();
    }
}

export const useModalStateStore = defineStore('modalState', () => {
    const modalState = ref(new ModalState());

    const loginPageOpened = computed(() => 
        modalState.value.modalStateMap[loginPageVisible]
    );

    const changeProfilePageOpened = computed(() => 
        modalState.value.modalStateMap[changeProfilePageVisible]
    );
    
    return { modalState, loginPageOpened, changeProfilePageOpened };
})