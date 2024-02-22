'use strict';
module.exports = {
    env: {
        browser: true,
        commonjs: false,
        es6: true,
        node: true
    },
    // 使用默认的配置
    extends: 'eslint:recommended',
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: false
        },
        sourceType: 'module'
    },
    plugins: ['vue'],
    // [中文文档: http://eslint.cn/docs/rules/ ](http://eslint.cn/docs/rules/)
    rules: {
        'no-const-assign': 'warn',
        'no-this-before-super': 'warn',
        'constructor-super': 'warn',
        'valid-typeof': 'warn',

        /* Possible Errors 逻辑相关 */
        // 默认设置已经开启了大部分，此处仅进行一点扩展
        // 禁止条件表达式中出现赋值操作符
        'no-cond-assign': 'error',
        // for循环方向检查
        'for-direction': 'error',
        // 禁止在条件中使用常量表达式
        'no-constant-condition': 'error',
        // 禁用 debugger
        'no-debugger': 'error',
        // 禁止 function 定义中出现重名参数
        'no-dupe-args': 'error',
        // 禁止对象字面量中出现重复的 key
        'no-dupe-keys': 'error',
        // 禁止出现重复的 case 标签
        'no-duplicate-case': 'error',
        // 	禁止出现空语句块
        'no-empty': 'warn',
        // 禁止在正则表达式中出现空字符集
        'no-empty-character-class': 'error',
        // 禁止不必要的分号
        'no-extra-semi': 'warn',
        // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
        'no-unreachable': 'warn',
        // 	要求 switch 语句中有 default 分支
        'default-case': 'error',
        // 要求使用 ===
        eqeqeq: 'warn',
        // 增加 use strict 声明
        // strict: ['off', 'global'],

        // 禁止case语句落空,可保证至多进入一个分支 推荐已经开启 不调整
        'no-fallthrough': 'error',
        // 禁止重新声明变量
        'no-redeclare': 'error',

        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        'no-undef': 'warn',

        /* Variables 变量声明*/
        // 控制变量声明时是否要初始化 默认为["error", "always"]
        'init-declarations': 'off',
        // 不允许在 catch 语句中遮盖变量 因为需要兼容IE8，因此打开，避免错误
        'no-catch-shadow': 'error',
        // 禁止删除变量
        'no-delete-var': 'warn',
        // 禁止变量声明覆盖外层作用域的变量
        'no-shadow': 'warn',
        // 关键字不能被遮蔽 如 var undefined; function NaN(){} 等
        'no-shadow-restricted-names': 'error',
        // 禁止使用undefined作为标识符 此处关闭，因为已经禁止关键字被遮蔽，不存在undefined不是undefined的情况
        'no-undefined': 'off',
        // 禁止出现未使用过的变量
        'no-unused-vars': 'warn',
        // 把 var 语句看作是在块级作用域范围之内
        'block-scoped-var': 'warn',
        // console
        'no-console': [
            1,
            {
                allow: ['warn', 'error']
            }
        ],
        /* Best Practices 最佳实践 */
        // 强制 getter 和 setter 在对象中成对出现 用不到
        'accessor-pairs': 'off',
        // 强制数组方法的回调函数中有 return 语句 同上
        'array-callback-return': 'off',
        // 限制圈复杂度 即 条件判断的各种分支
        complexity: [
            'error',
            {
                max: 40
            }
        ],
        // 要求 return 语句要么总是指定返回的值，要么不指定
        'consistent-return': 'off',
        // 强制所有控制语句使用一致的括号风格
        curly: ['error', 'multi-line'],
        // 强制在点号之前或之后换行
        'dot-location': ['error', 'property'],
        // 要求使用点号 尽可能使用.而不是[]
        'dot-notation': 'warn',

        // 要求 for-in 循环中有一个 if 语句，防止不必要的对原型属性进行处理
        'guard-for-in': 'warn',
        // 禁用 alert、confirm 和 prompt 交付代码中应该是不出现这东西的
        'no-alert': 'warn',
        // 禁用 arguments.caller 或 arguments.callee  规范已经禁止使用了
        'no-caller': 'warn',
        // 不允许在 case 子句中使用词法声明  eslint推荐配置就是开启的，无需调整
        // "no-case-declarations"
        // 禁止除法操作符显式的出现在正则表达式开始的位置 "no-div-regex"
        // 禁止 if 语句中 return 语句之后有 else 块
        // 如下：else是多余的
        // if (x) {
        // return y;
        // } else {
        //     return z;
        // }
        'no-else-return': 'warn',
        // 禁止空函数 可能需要 推荐未开启 不调整
        // "no-empty-function": "off",
        // 禁止使用空解构模式,推荐已经开启 不调整
        // "no-empty-pattern"
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        'no-eq-null': 'error',
        // 禁用 eval()  关闭
        'no-eval': 'off',
        // 禁止扩展原生类型
        'no-extend-native': 'error',
        // 禁止不必要的 .bind() 调用
        'no-extra-bind': 'warn',
        // 禁止数字字面量中使用前导和末尾小数点 即禁止 .2 2. 这样的写法
        'no-floating-decimal': 'warn',
        // 禁止重新对全局变量赋值 推荐已经开启，不调整
        // "no-global-assign":"error",
        // 禁止使用较短的符号实现类型转换 如! !! 等，比较实用而且默认也没开始 保持关闭
        // "no-implicit-coercion": "off",
        // 禁止只用new而不赋值
        // 如 new Person()
        'no-new': 'warn',
        // 禁止自身比较
        'no-self-compare': 'warn',
        // 禁止不必要的 .call() 和 .apply()
        'no-useless-call': 'warn',
        // 禁用 with 语句
        'no-with': 'error',
        // 强制在parseInt()使用基数参数
        radix: 'warn',
        // 要求 IIFE 使用括号括起来
        'wrap-iife': 'off',

        // 分号警告
        semi: 'warn',
        // 单引号警告
        quotes: ['warn', 'single'],

        /* Stylistic 代码风格 参考 http://eslint.cn/docs/rules/#stylistic-issues */
        // 禁止空格和 tab 的混合缩进
        'no-mixed-spaces-and-tabs': 'error',

        // 大括号风格，使用1tbs 单行是允许在同一行
        'brace-style': [
            'warn',
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        // 禁止或强制在计算属性中使用空格 即方括号中
        'computed-property-spacing': ['warn', 'never'],
        // 缩进 4个空格缩进，否则报错
        // "indent": ["error", 4, {
        //     // case 字句缩进级别
        //     "SwitchCase": 1
        // }],
        // 禁止多行空白
        'no-multiple-empty-lines': 'warn',
        // 禁用尾随逗号
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }
        ],
        'padding-line-between-statements': [
            2,
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var'],
                next: '*'
            },
            {
                blankLine: 'always',
                prev: '*',
                next: ['return']
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var']
            }
        ]
    }
};
