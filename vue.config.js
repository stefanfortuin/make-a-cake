const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false
		},
	},
	configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
};

