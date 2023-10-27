import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/config'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faShoppingCart, faHome, faPenToSquare, faBars,faTrashCan,faPen, faEllipsisVertical,faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faLinkedin,faTwitter } from '@fortawesome/free-brands-svg-icons'


/* add icons to the library */
library.add(faShoppingCart, faHome, faPenToSquare, faFacebook, faGithub, faLinkedin,faTwitter,faBars,faTrashCan,faPen,faEllipsisVertical,faXmark)

let app;

auth.onAuthStateChanged(()=>{
    if(!app){
        app = createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
    }
})




