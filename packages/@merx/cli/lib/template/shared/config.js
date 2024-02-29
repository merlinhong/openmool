/*
 * 作者: merlinhong
 * 描述: 全局配置项
 */
(function (global) {
    global.Config = global.Config || {
        /**
         * 是否开启代理
         */
        ajax: {
            // 是否开启错误状态码自动弹窗提示
            isAutoErrToast: true,
            // 每次 ajax时，也可以增加isAutoProxy:false，来让本次请求不代理
            // 是否自动代理，如果开启，所有的请求会默认带上用户相关信息，h5是cookie中，app是headers中
            // 如果非新点标准后台，请关闭，否则会影响正常请求
            isAutoProxy: true
        },
        /**
         * 可以修改getToken返回的值，方便调试
         * 开发人员无需关注token（通过ajax自动代理进行设置）
         */
        token: {
            // 是否使用自定义token，可以用于H5环境下的token赋值刷新，影响到所有Util.ajax与下拉刷新请求
            // isUseSelfToken: false,
            isUseSelfToken: true,
            // 可以是字符串，也可以是方法
            // h5环境下isUseSelfToken为true生效
            getToken() {
                return new Promise(function (resolve, reject) {
                    // ...
                    resolve('d5c62d6a11c00e124ddc8535d5e0e993');
                });
            },
            // h5环境下isUseSelfToken为true生效
            refreshToken: function () {
                // ...
            }
        },
        /**
         * 是否开启 调试面板， 开启可以在移动端捕获log
         * 仅在debug模式下有效
         */
        isDebugPanel: 0,
        /**
         * 是否进行mock模拟数据请求
         * 仅在debug模式下有效
         */
        isMock: true,

        /**
         * 是否在生产环境下排除mockjs库
         * 防止构建后带mockjs资源过大
         * isMock: true时生效
         */
        isProductionExternalMock: true,
        /**
         * 是否开启性能检测
         */
        isTestPerformance: 0,

        /**
         * 是否正式环境
         */
        isFormal: true,

        /**
         * 是否生产环境
         */

        isProduction: false,

        /**
         * 业务接口相关的配置
         */
        serverUrl: () => {
            // 是否是正式
            return new Promise(function (resolve) {
                if (this.isFormal) {
                    // 正式
                    resolve('http://example');
                } else {
                    // 测试
                    resolve('http://example');
                }
            });
        },
        // 判断浏览器环境还是app
        isApp: true
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Config;
    }
})(typeof window !== 'undefined' ? window : global);
