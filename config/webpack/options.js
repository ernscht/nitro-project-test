const config = require('config');
const options = {
	rules: {
		js: {
			eslint: config.get('code.validation.eslint.live'),
		},
		ts: false,
		scss: {
			stylelint: config.get('code.validation.stylelint.live'),
		},
		hbs: true,
		woff: true,
		image: true,
	},
	features: {
		gitInfo: false,
	},
};

module.exports = options;
