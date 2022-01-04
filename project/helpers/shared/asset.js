/**
 * Full asset helper
 *
 * asset helper, can be used to change asset paths depending on the environment
 * - prefix assets with the correct path of their environment
 * - use minified version only on production environment
 *
 * Usage:
 *
 * {{asset name='/css/ui.rev.min.css'}}
 * (will load  public/assets/<theme>/css/ui.css)
 *
 * {{asset name='/img/icon/favicon-32x32.png'}}
 * (will load public/assets/<theme>/img/icon/favicon-32x32.png)
 */

const hbs = require('hbs');
const path = require('path');

module.exports = function (context) {
	const contextDataRoot = context.data && context.data.root ? context.data.root : {};
	let name = context.hash.name;

	// remove .rev from asset
	name = name.replace(/\.rev\./, '.');

	// remove .min from asset on development environment
	if (!contextDataRoot._nitro.production) {
		name = name.replace(/\.min\./, '.');
	}

	const theme = contextDataRoot.theme ? `/${contextDataRoot.theme.id}` : '';

	const assetPath = path.join('/assets/', theme, name).replace(/\\/g, '/');
	return new hbs.SafeString(assetPath);
};
