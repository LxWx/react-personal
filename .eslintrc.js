module.exports = {
    "env": {
        "browser": true
    },
    "parser": "babel-eslint",
    "rules": {
        "no-array-constructor": 2,//禁止使用数组构造器
        "no-bitwise": 0,//禁止使用按位运算符
        "no-caller": 1,//禁止使用arguments.caller或arguments.callee
        "no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
        "no-const-assign": 2,//禁止修改const声明的变量
        "no-continue": 0,//禁止使用continue
        "no-control-regex": 2,//禁止在正则表达式中使用控制字符
        "no-delete-var": 2,//不能对var声明的变量使用delete操作符
        "no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
        "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-args": 2,//函数参数不能重复
        "no-duplicate-case": 2,//switch中的case标签不能重复
        "no-empty": 2,//块语句中的内容不能为空
        "no-empty-character-class": 2,//正则表达式中的[]内容不能为空
        "no-eval": 1,//禁止使用eval
        "no-extend-native": 2,//禁止扩展native对象
        "no-fallthrough": 1,//禁止switch穿透
        "no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
        "no-invalid-regexp": 2,//禁止无效的正则表达式
        "no-irregular-whitespace": 2,//不能有不规则的空格
        "no-iterator": 2,//禁止使用__iterator__ 属性
        "no-labels": 2,//禁止标签声明
        "no-lone-blocks": 2,//禁止不必要的嵌套块
        "linebreak-style": [0, "windows"],//换行风格
        "no-multi-spaces": 1,//不能用多余的空格
        "no-multiple-empty-lines": [1, { "max": 2 }],//空行最多不能超过2行
        "no-negated-in-lhs": 2,//in 操作符的左边不能有!
        "no-new-func": 1,//禁止使用new Function
        "no-new-object": 2,//禁止使用new Object()
        "no-new-require": 2,//禁止使用new require
        "no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
        "no-octal": 2,//禁止使用八进制数字
        "no-octal-escape": 2,//禁止使用八进制转义序列
        "no-proto": 2,//禁止使用__proto__属性
        "no-redeclare": 2,//禁止重复声明变量
        "no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
        "no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错
        "no-return-assign": 1,//return 语句中不能有赋值表达式
        "no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
        "no-trailing-spaces": 1,//一行结束后面不要有空格
        "no-this-before-super": 0,//在调用super()之前不能使用this或super
        "no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
        "no-undef": 0,//不能有未定义的变量
        "no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
        "no-unexpected-multiline": 2,//避免多行表达式
        "no-unreachable": 2,//不能有无法执行的代码
        "no-var": 0,//禁用var，用let和const代替
        "no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
        "no-with": 2,//禁用with
        "array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
        "arrow-parens": 0,//箭头函数用小括号括起来
        "arrow-spacing": 0,//=>的前/后括号
        "accessor-pairs": 0,//在对象中使用getter/setter
        "block-scoped-var": 0,//块语句中使用var
        "brace-style": [1, "1tbs"],//大括号风格
        "callback-return": 1,//避免多次调用回调什么的
        "camelcase": 2,//强制驼峰法命名
        "comma-spacing": 0,//逗号前后的空格
        "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
        "complexity": [0, 11],//循环复杂度
        "computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的
        "consistent-return": 0,//return 后面是否允许省略
        "consistent-this": [2, "that"],//this别名
        "constructor-super": 0,//非派生类不能调用super，派生类必须调用super
        "curly": [2, "all"],//必须使用 if(){} 中的{}
        "default-case": 2,//switch语句最后必须有default
        "dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
        "dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号
        "eol-last": 0,//文件以单一的换行符结束
        "func-names": 0,//函数表达式必须有名字
        "func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
        "generator-star-spacing": 0,//生成器函数*的前后空格
        "guard-for-in": 0,//for in循环要用if语句过滤
        "handle-callback-err": 0,//nodejs 处理错误
        "id-length": 0,//变量名长度
        "indent": [2, 4],//缩进风格
        "init-declarations": 0,//声明时必须赋初值
        "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
        "lines-around-comment": 0,//行前/行后备注
        "max-depth": [0, 4],//嵌套块深度
        "max-len": [0, 80, 4],//字符串最大长度
        "max-nested-callbacks": [0, 2],//回调嵌套深度
        "max-statements": [0, 10],//函数内最多有几个声明
        "new-parens": 2,//new时必须加小括号
        "object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
        "object-shorthand": 0,//强制对象字面量缩写语法
        "operator-assignment": [0, "always"],//赋值运算符 += -=什么的
        "operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
        "padded-blocks": 0,//块语句内行首行尾是否要空行
        "prefer-const": 0,//首选const
        "prefer-spread": 0,//首选展开运算
        "quotes": [1, "single"],//引号类型 `` "" ''
        "id-match": 0,//命名检测
        "require-yield": 0,//生成器函数必须有yield
        "semi": [2, "always"],//语句强制分号结尾
        "semi-spacing": [0, { "before": false, "after": true }],//分号前后空格
        "sort-vars": 0,//变量声明时排序
        "space-after-keywords": [0, "always"],//关键字后面是否要空一格
        "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
        "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
        "space-in-parens": [0, "never"],//小括号里面要不要有空格
        "space-infix-ops": 0,//中缀操作符周围要不要有空格
        "space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
        "spaced-comment": 0,//注释风格要不要有空格什么的
        "valid-typeof": 2,//必须使用合法的typeof的值
        "wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
        "wrap-regex": 0,//正则表达式字面量用小括号包起来
    }
};