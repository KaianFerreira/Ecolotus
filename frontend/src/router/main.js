export default [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: () => import (/* webpackChunkName: "main" */ '../components/Home.vue'),
    children: [
      {
        path: '',
        name: 'posts',
        component: () => import (/* webpackChunkName: "main" */ '../components/Posts.vue'),
        props: true
      },
      {
        path: 'post/:id',
        name: 'post',
        component: () => import (/* webpackChunkName: "main" */ '../components/Post.vue'),
        props: true
      },
      {
        path: 'me/:mode',
        name: 'User',
        component: () => import (/* webpackChunkName: "main" */ '../components/User.vue'),
        props: true
      }
    ]
  }
]