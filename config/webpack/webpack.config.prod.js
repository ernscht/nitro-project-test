const options = require('./options');
const webpackConfig = require('@nitro/webpack/webpack-config/webpack.config.prod')(options);
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpackManifestPluginOptions = {
	basePath: '/',
	filter: (file) => {
		return file.isAsset && file.isModuleAsset;
	},
};

webpackConfig.plugins.push(new WebpackManifestPlugin(webpackManifestPluginOptions));

module.exports = webpackConfig;
