module.exports = function (entry) {
    return {
        entry: entry,
        devtool: 'source-map',
        cache: true,
        module: {
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
                {test: /node_modules\/flux-lumines\/((?!node_modules).)*\.js$/, loaders: ['react-hot', 'babel-loader']},
                {test: /node_modules\/flux-lumines\/((?!node_modules).)*\.less$/, loader: 'style!css!autoprefixer-loader!less'}
            ]
        },
        output: {
            publicPath: "http://localhost:9090/build/",
            filename: "bundle.js"
        }
    };
};
