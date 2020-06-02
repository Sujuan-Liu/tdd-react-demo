
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/login', component: '../pages/login'},
        { path: '/user/list', component: '../pages/user/list'},
        { path: '/user/detail', component: '../pages/user/detail'}
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: {
        dynamicImport: true,
        hmr: true
      },
      dynamicImport: false,
      title: 'react',
      // webpack dll 预打包，二次启动提速
      dll: {
        exclude: [],
        include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch']
      },      
      routes: {
        exclude: [
          /components\//,
          /model\.(j|t)sx?$/,
          /components\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /services\//
        ],
      },
    }],
  ],
}
