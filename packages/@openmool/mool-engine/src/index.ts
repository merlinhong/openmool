export default{
    install(app: any) {
       // 注册低码引擎页面
       app.component('MoolEngine', () => import('$/designer/views/designer.vue'))
    }
}