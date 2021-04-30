const config = require('config');
const validThemes = config.has('themes') && Array.isArray(config.get('themes')) ? config.get('themes') : false;
const theme = process.env.THEME ? process.env.THEME : validThemes.find((theme) => theme.isDefault).id;
const options = {
	rules: {
		js: {
			eslint: config.get('code.validation.eslint.live'),
		},
		ts: false,
		scss: {
			stylelint: config.get('code.validation.stylelint.live'),
			implementation: require('node-sass'),
		},
		hbs: true,
		woff: true,
		image: true,
	},
	features: {
		banner: true,
		bundleAnalyzer: false,
		theme: theme,
		dynamicAlias: {
			search: '/theme/light',
			replace: `/theme/${theme}`,
		},
	},
};

module.exports = options;
