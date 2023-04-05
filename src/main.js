import { createApp } from 'vue'
import App from './App.vue'
import MInput from './components/input/MInput.vue'
import MInputNumber from './components/input/MInputNumber.vue'
import MInputDisable from './components/input/MInputDisable.vue'
import MButton from './components/button/MButton.vue'
import MInputDate from './components/input/MInputDate.vue'
import MDropdown from './components/dropdown/MDropdown.vue'
import MButtonIcon from './components/button/MButtonIcon.vue'
import MDialog from './components/dialog/MDialog.vue'
import MDialogLoadData from './components/dialog/MDialogLoadData.vue'
import MCheckbox from './components/checkbox/MCheckbox.vue'

// import các views
import AssetList from './views/asset/assetList/AssetList.vue'
import TheAssetHTDB from './views/other/TheAssetHTDB.vue';
import TheOverview from './views/other/TheOverview.vue';
import TheTool from './views/other/TheTool.vue';
import TheCategory from './views/other/TheCategory.vue';
import TheReport from './views/other/TheReport.vue';
import TheSearch from './views/other/TheSearch.vue';

const app = createApp(App);

// Bước 1: import vue-router
import {createRouter, createWebHistory} from 'vue-router'

// Bước 2: router - Định nghĩa router
const routers = [
    {path:"/overview",component : TheOverview},
    {path:"/", component : AssetList},
    {path:"/assetHTDB",component : TheAssetHTDB},
    {path:"/tools",component : TheTool},
    {path:"/category",component : TheCategory},
    {path:"/search",component : TheSearch},
    {path:"/report",component : TheReport},
    

]

// Bước 3: Khởi tạo router
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

// Bước 4: User router trong app
app.use(router);


app.component("MCheckbox",MCheckbox);
app.component("MInput",MInput);
app.component("MInputNumber",MInputNumber);
app.component("MInputDisable",MInputDisable);
app.component("MInputDate",MInputDate);
app.component("MButton",MButton);
app.component("MDropdown",MDropdown);
app.component("MButtonIcon",MButtonIcon);
app.component("MDialogLoadData",MDialogLoadData);
app.component("MDialog",MDialog);
app.mount('#app')


