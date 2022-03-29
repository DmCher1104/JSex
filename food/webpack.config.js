'use strict';

let path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/js'
    },
    watch: true,

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            "targets": {
                                "edge": "17",
                                "firefox": "60",
                                "chrome": "67",
                                "safari": "11.1",
                                "ie": "9"
                            },
                            debug: true,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                    }
                }
            }
        ]
    }
};
