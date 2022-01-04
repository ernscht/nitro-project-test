/**
 * asset helper for hashed assets, can be used to return the hashed filename from webpack manifest
 *
 * Usage:
 *
 * {{assetHashed name='/media/fonts/gaegu-v2-latin-regular.woff2'}}
 * (will return  /media/fonts/gaegu-v2-latin-regular-506164b.woff2)
 * use with asset helper:
 * <link rel="preload" href="{{asset name=(assetHashed name='/media/fonts/gaegu-v2-latin-regular.woff2')}}" as="font" type="font/woff2" crossorigin>
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
		return manifest[name].replace(`/assets${theme}`, '');
	} catch (e) {
		return name;
	}
};
