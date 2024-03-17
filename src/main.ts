import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import "bootstrap/dist/css/bootstrap-utilities.css"
import { convertToString } from './stores/utils.js'
import { usePostStore } from './stores/post.js'
import { commentState } from './stores/comment.js'

library.add(fas, far, fab);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

router.beforeEach((to, from) => {
    if (to.name === 'post') {
        const postStore = usePostStore();
        postStore.fetchPost(BigInt(convertToString(to.params.id)));
        commentState.postId = BigInt(convertToString(to.params.id));
        commentState.currentPage = 0;
    }
})
app.mount('#app')
