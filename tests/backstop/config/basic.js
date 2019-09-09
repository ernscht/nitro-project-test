'use strict';

function getHostName() {
	return process.platform === 'win32' || process.platform === 'darwin' ? 'http://host.docker.internal' : 'http://localhost';
}
const port = process.env.PORT || '8889';
const hostName = process.env.HOSTNAME || getHostName();
const host = `${hostName}:${port}`;
console.log(`backstop test host: ${host}`);
const viewports = [
	{
		label: 'phone',
		width: 320,
		height: 568,
	},
	{
		label: 'tablet',
		width: 768,
		height: 1024,
	},
	{
		label: 'desktop',
		width: 1280,
		height: 1024,
	},
];

module.exports = {
	host,
	baseConfig: {
		id: 'nitro_test',
		viewports,
		onBeforeScript: 'puppet/onBefore.js',
		onReadyScript: 'puppet/onReady.js',
		paths: {
			bitmaps_reference: 'tests/backstop/bitmaps_reference',
			bitmaps_test: 'project/tmp/reports/backstop/bitmaps_test',
			engine_scripts: 'tests/backstop/engine_scripts',
			html_report: 'public/reports/backstop/html',
			ci_report: 'project/tmp/reports/backstop/ci',
		},
		report: ['browser', 'CI'],
		engine: 'puppeteer',
		engineOptions: {
			args: ['--no-sandbox'],
		},
		resembleOutputOptions: {
			ignoreAntialiasing: true,
		},
		asyncCaptureLimit: 5,
		asyncCompareLimit: 50,
		debug: false,
		debugWindow: false,
		dockerCommandTemplate:
			`docker run --rm -i -e HOSTNAME=${hostName} --mount type=bind,source="{cwd}",target=/src --network host backstopjs/backstopjs:{version} {backstopCommand} {args}`,
	},
	baseScenario: {
		// cookiePath: 'tests/backstop/engine_scripts/cookies.json',
		referenceUrl: '',
		readyEvent: '',
		readySelector: '',
		delay: 0,
		hideSelectors: [],
		removeSelectors: [],
		hoverSelector: '',
		clickSelector: '',
		postInteractionWait: 0,
		selectors: [],
		selectorExpansion: false,
		misMatchThreshold: 0.1,
		requireSameDimensions: true,
	},
};
