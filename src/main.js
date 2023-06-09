import { createApp } from 'vue';
import App from './App.vue';
import MTooltip from './components/tooltip/MTooltip.vue';
import MInput from './components/input/MInput.vue';
import MForm from './components/form/MForm.vue';
import MInputNumber from './components/input/MInputNumber.vue';
import MInputDisable from './components/input/MInputDisable.vue';
import MButton from './components/button/MButton.vue';
import MTable from './components/table/MTable.vue';
import MInputDate from './components/input/MInputDate.vue';
import MDropdown from './components/dropdown/MDropdown.vue';
import MButtonIcon from './components/button/MButtonIcon.vue';
import MDialog from './components/dialog/MDialog.vue';
import MDialogLoadData from './components/dialog/MDialogLoadData.vue';
import MCheckbox from './components/checkbox/MCheckbox.vue';
import MCombobox from './components/combobox/MCombobox.vue';
import MToastSucess from '@/components/toast/MToastSucess.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import clickOutside from './js/clickoutside';


// import các views
import AssetList from './views/asset/assetList/AssetList.vue';
import AssetIncrementList from './views/assetIncrement/assetIncrementList/AssetIncrementList.vue';
import TheAssetHTDB from './views/other/TheAssetHTDB.vue';
import TheOverview from './views/other/TheOverview.vue';
import TheTool from './views/other/TheTool.vue';
import TheCategory from './views/other/TheCategory.vue';
import TheReport from './views/other/TheReport.vue';
import TheSearch from './views/other/TheSearch.vue';

const app = createApp(App);

// Bước 1: import vue-router
import {createRouter, createWebHistory} from 'vue-router';

// Bước 2: router - Định nghĩa router
const routers = [
    {path:"/overview",component : TheOverview},
    {path:"/", component : AssetList},
    {path:"/AssetIncrementList", component : AssetIncrementList},
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
app.directive('outside',clickOutside);
app.use(ElementPlus)

app.component("MToastSucess",MToastSucess);
app.component("MTooltip",MTooltip);
app.component("MForm",MForm);
app.component("MCombobox",MCombobox);
app.component("MCheckbox",MCheckbox);
app.component("MInput",MInput);
app.component("MTable",MTable);
app.component("MInputNumber",MInputNumber);
app.component("MInputDisable",MInputDisable);
app.component("MInputDate",MInputDate);
app.component("MButton",MButton);
app.component("MDropdown",MDropdown);
app.component("MButtonIcon",MButtonIcon);
app.component("MDialogLoadData",MDialogLoadData);
app.component("MDialog",MDialog);
app.mount('#app');


