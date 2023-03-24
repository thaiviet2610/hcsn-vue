import { createApp } from 'vue'
import App from './App.vue'
import MInput from './components/input/MInput.vue'
import MButton from './components/button/MButton.vue'
import MInputDate from './components/input/MInputDate.vue'
import MDropdown from './components/dropdown/MDropdown.vue'
import MButtonIcon from './components/button/MButtonIcon.vue'
import MDialogNotify from './components/dialog/MDialogNotify.vue'
import MDialogLoadData from './components/dialog/MDialogLoadData.vue'
const app = createApp(App);
app.component("MInput",MInput);
app.component("MInputDate",MInputDate);
app.component("MButton",MButton);
app.component("MDropdown",MDropdown);
app.component("MButtonIcon",MButtonIcon);
app.component("MDialogLoadData",MDialogLoadData);
app.component("MDialogNotify",MDialogNotify);
app.mount('#app')


