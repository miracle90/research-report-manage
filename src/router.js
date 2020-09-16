import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import Welcome from './views/Welcome.vue'
import User from './views/User.vue'
import Article from './views/Article.vue'
import Upload from './views/Upload.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '',
          name: 'welcome',
          component: Welcome
        },
        {
          path: 'user',
          name: 'user',
          component: User
        },
        {
          path: 'article',
          name: 'article',
          component: Article
        },
        {
          path: 'upload',
          name: 'upload',
          component: Upload
        }
      ]
    }
  ]
})
