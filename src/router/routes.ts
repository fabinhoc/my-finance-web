import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('src/pages/Login.page.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('src/pages/ForgotPassword.page.vue'),
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: () => import('src/pages/SignUp.page.vue'),
      },
      {
        path: 'email-verification',
        name: 'email-verification',
        component: () => import('src/pages/EmailVerify.page.vue'),
      },
      {
        path: 'verify',
        name: 'verify',
        component: () => import('src/pages/Verify.page.vue'),
      },
      {
        path: 'reset-password-confirmation',
        name: 'resetPasswordConfirmation',
        component: () => import('src/pages/ResetPasswordConfirmation.page.vue'),
      },
      {
        path: 'reset-password',
        name: 'resetPassword',
        component: () => import('src/pages/ResetPassword.page.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('src/pages/Index.page.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/notebooks',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: ':id/:name',
        name: 'notebooks',
        component: () => import('src/pages/Notebook.page.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('src/pages/Profile.page.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
