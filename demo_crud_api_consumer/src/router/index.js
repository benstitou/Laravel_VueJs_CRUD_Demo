import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PostsManager from '@/components/PostsManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/posts-manager',
      name: 'PostsManager',
      component: PostsManager
    }
  ]
})
