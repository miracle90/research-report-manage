import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
// Welcomeimport Welcome from './views/Welcome.vue'
import User from './views/User.vue'
import Article from './views/Article.vue'
import Upload from './views/Upload.vue'
import Keyword from './views/Keyword.vue'
import Featured from './views/Featured.vue'
import Organization from './views/Organization.vue'

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
      redirect: '/index/featured',
      children: [
        {
          path: '/index/featured',
          name: 'featured',
          component: Featured
        },
        // {
        //   path: '',
        //   name: 'welcome',
        //   component: Welcome
        // },
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
        },
        {
          path: 'organization',
          name: 'organization',
          component: Organization
        },
        {
          path: 'keyword',
          name: 'keyword',
          component: Keyword
        }
      ]
    }
  ]
})
