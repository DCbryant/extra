const path = require('path')

module.exports={
    entry:{
        index:'./src/index.js',
       
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {// 配置es6 react
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                options:{
                    presets:[
                        "env","react"
                    ]
                }
            }
        ]
    }, 
}