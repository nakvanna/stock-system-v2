import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: '/brands', component: () => import('pages/brand/Brand.index.vue')},
      {path: '/purchases', meta: 'purchases', component: () => import('pages/purchase/Purchase.index.vue')},
      {path: '/purchase/new', meta: 'purchases', component: () => import('pages/purchase/Purchase.create.vue')},
      {
        path: '/settings', component: () => import('pages/setting/Setting.index.vue'),
        children: [
          {
            path: '/',
            meta: 'settings',
            component: () => import('pages/setting/product/Product.index.vue')
          },
        ]
      },
      {
        path: '/settings/products/new',
        meta: 'settings',
        component: () => import('pages/setting/product/Product.create.vue')
      },
      {
        path: '/settings/products/view',
        meta: 'settings',
        component: () => import('pages/setting/product/Product.view.vue')
      },
      {
        path: '/other-settings', meta: 'settings', component: () => import('pages/setting/SubSetting.index.vue'),
        children: [
          {
            path: '/',
            meta: 'settings',
            component: () => import('pages/setting/sub-setting/category/Category.index.vue')
          },
          {
            path: '/other-settings/sub-categories',
            meta: 'settings',
            component: () => import('pages/setting/sub-setting/sub-category/SubCategory.index.vue')
          },
          {
            path: '/other-settings/brands',
            meta: 'settings',
            component: () => import('pages/setting/sub-setting/brand/Brand.index.vue')
          },
        ]
      },
    ]
  },
  {
    path: '/view',
    component: () => import('layouts/MainLayoutView.vue'),
    children: [
      {path: '/', component: () => import('pages/product-page/ProductViewPage.vue')},
      {path: '/view/sale/:id', component: () => import('pages/product-page/ProductSalePage.vue')}
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
