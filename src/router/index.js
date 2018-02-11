import Vue from 'vue';
import Router from 'vue-router';

import Login from '../components/common/Login';

import authMiddleware from '../modules/auth/auth.middleware';
import userRoutes from './user.routes';

Vue.use(Router);

const appRouter = new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'dashboard' },
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    ...userRoutes,
  ],
});

appRouter.beforeEach(authMiddleware);

appRouter.replace({ name: 'dashboard' });

export default appRouter;
