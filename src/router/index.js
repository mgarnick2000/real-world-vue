import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';
import EventCreate from '../views/EventCreate.vue';
import NProgress from 'nprogress';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event;
        next();
      });
    },
    // alias: '/about',
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  // {
  //   path: '/about',
  //   redirect: { name: 'about' },
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
