import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Option,
  Select,
  Form,
  FormItem,
  Input,
  Button,
  Notification,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Checkbox,
  Radio,
  RadioGroup,
  TimePicker,
  DatePicker,
  Col,
  Upload
} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(Option)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Col)
Vue.use(Upload)
Vue.prototype.$notify = Notification

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
