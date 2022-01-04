/**
 * asset helper for hashed assets, can be used to return the full public path to a hashed file using webpack manifest
 *
 * Usage:
 *
 * {{asset-hashed name='media/fonts/gaegu-v2-latin-regular.woff2'}}
 * (will load  /assets/<theme>/media/fonts/gaegu-v2-latin-regular-506164b.woff2)
 */

const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
const config = require('config');

module.exports = function (context) {
	const contextDataRoot = context.data && context.data.root ? context.data.root : {};
	const name = context.hash.name;
	const theme = contextDataRoot.theme ? `/${contextDataRoot.theme.id}` : '';
	try {
		const manifest = require(path.join(config.get('nitro.basePath'), 'public/assets', theme, 'manifest.json'));
		const assetPath = manifest[name];
		return new hbs.SafeString(assetPath);
	} catch (e) {
		return new hbs.SafeString(name);
	}
};
