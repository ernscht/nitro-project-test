/**
 * Full asset helper
 *
 * asset helper, can be used to change asset paths depending on the environment
 * - prefix assets with the correct path of their environment
 * - use minified version only on production environment
 * - use manifest to output webpack hashed filename
 *
 * Usage:
 *
 * {{asset name='/css/ui.rev.min.css'}}
 * (will load  public/assets/<theme>/css/ui.css)
 *
 * {{asset name='/img/icon/favicon-32x32.png'}}
 * (will load public/assets/<theme>/img/icon/favicon-32x32.png)
 *
 * <link rel="preload" href="{{asset name='/media/fonts/gaegu-v2-latin-regular.woff2' hashed=true}}" as="font" type="font/woff2" crossorigin>
 * (will load  public/assets/<theme>/media/fonts/gaegu-v2-latin-regular-506164b.woff2)
 */

const hbs = require('hbs');
const path = require('path');
const config = require('config');

module.exports = function (context) {
	const contextDataRoot = context.data && context.data.root ? context.data.root : {};
	let name = context.hash.name;
	const hashed = context.hash.hashed;

	// remove .rev from asset
	name = name.replace(/\.rev\./, '.');

	// remove .min from asset on development environment
	if (!contextDataRoot._nitro.production) {
		name = name.replace(/\.min\./, '.');
	}

	const theme = contextDataRoot.theme ? `/${contextDataRoot.theme.id}` : '';

	if (hashed) {
		try {
			const manifest = require(path.join(config.get('nitro.basePath'), 'public/assets', theme, 'manifest.json'));
			name = manifest[name].replace(`/assets${theme}`, '');
		} catch (e) {}
	}

	const assetPath = path.join('/assets/', theme, name).replace(/\\/g, '/');
	return new hbs.SafeString(assetPath);
};
