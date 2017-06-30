'use strict';

import App from './src/js/App';
import BuildTemplate from './src/js/BuildTemplate';

const displayNavigatorData = (data) => {
	const templateScript = document.querySelector('#navigator').innerHTML;
	const output = document.querySelector('#output');

	BuildTemplate(templateScript, data, output);
}

document.addEventListener('DOMContentLoaded', (e) => {
	const navigator = window.navigator;
	let loading = document.querySelector('#loading');

	displayNavigatorData(navigator);

	loading.classList.remove('js-active');

	if ('standalone' in navigator && navigator.standalone) {
		App.WebApp();
	} else {
		App.Desktop();
	}
	App.initEvents();
}, false);