import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      //Purchases route
      {path: '/purchases', meta: 'purchases', component: () => import('pages/purchase/Purchase.index.vue')},
      {path: '/purchase/new', meta: 'purchases', component: () => import('pages/purchase/Purchase.create.vue')},
      {path: '/purchase/edit', meta: 'purchases', component: () => import('pages/purchase/Purchase.edit.vue')},
      {path: '/purchase/view/:id', meta: 'purchases', component: () => import('pages/purchase/Purchase.view.vue')},
      {path: '/purchase/payback/:id', meta: 'purchases', component: () => import('pages/purchase-payback/PurchasePayback.create.vue')},
      {path: '/purchase/view/payback/:id', meta: 'purchases', component: () => import('pages/purchase-payback/PurchasePayback.index.vue')},
      //Sale route
      {path: '/sales', meta: 'sales', component: () => import('pages/sale/Sale.index.vue')},
      {path: '/sale/new', meta: 'sales', component: () => import('pages/sale/Sale.create.vue')},
      {path: '/sale/view/:id', meta: 'sales', component: () => import('pages/sale/Sale.view.vue')},
      {
        path: '/settings', component: () => import('pages/setting/Setting.index.vue'),
        children: [
          {
            path: '/',
            meta: 'settings',
            component: () => import('pages/setting/product/Product.index.vue')
          },{
            path: '/settings/customer',
            meta: 'settings',
            component: () => import('pages/setting/customer/Customer.index.vue')
          },
        ]
      },
      {
        path: '/settings/products/new',
        meta: 'settings',
        component: () => import('pages/setting/product/Product.create.vue')
      },{
        path: '/settings/customer/new',
        meta: 'settings',
        component: () => import('pages/setting/customer/Customer.create.vue')
      },
      {
        path: '/settings/product/view',
        meta: 'settings',
        component: () => import('pages/setting/product/Product.view.vue')
      },
      {
        path: '/settings/customer/view',
        meta: 'settings',
        component: () => import('pages/setting/customer/Customer.view.vue')
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
