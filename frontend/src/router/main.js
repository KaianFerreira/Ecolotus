export default [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: () => import (/* webpackChunkName: "main" */ '../components/Home.vue'),
    children: [
      {
        path: '',
        name: 'posts',
        component: () => import (/* webpackChunkName: "main" */ '../components/Posts.vue'),
        props: true
      },
      {
        path: 'post',
        name: 'post',
        component: () => import (/* webpackChunkName: "main" */ '../components/Post.vue'),
        props: true
      },
      {
        path: 'me',
        name: 'User',
        component: () => import (/* webpackChunkName: "main" */ '../components/User.vue')
      }
    ]
  }
]