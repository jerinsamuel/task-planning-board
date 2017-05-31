var path = require("path");
var webpack = require("webpack");

module.exports = (env) => {
    return [{
        entry: {
            "lib/lib": ["jquery", "bootstrap", "react", "react-dom", "moment"]
        },

        output: {
            path: path.resolve(__dirname, "wwwroot/scripts"),
            publicPath: "/wwwroot/scripts",
            filename: "[name].bundle.js",
            libraryTarget: "amd"
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                moment: "moment",
                Promise: "es6-promise-promise"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "lib/lib"
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": isDevBuild ? "'development'" : "'production'"
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ].concat(isDevBuild ? [] : [new webpack.optimize.UglifyJsPlugin()]),
        resolve: {
            alias: {
                OfficeFabric: path.resolve(__dirname, "node_modules/office-ui-fabric-react/lib-amd/")
            },
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        node: {
            fs: "empty"
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        }
    }];
};