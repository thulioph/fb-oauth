'use strict';

import App from './App';
import BuildTemplate from './BuildTemplate';

const displayNavigatorData = () => {
	const templateScript = document.querySelector('#navigator').innerHTML;
	const navigatorObj = window.navigator;
	const output = document.querySelector('#output');

	BuildTemplate(templateScript, navigatorObj, output);
}

document.addEventListener('DOMContentLoaded', (e) => {
	displayNavigatorData();

	if ('standalone' in navigator && navigator.standalone) {
		App.WebApp();
	} else {
		App.Desktop();
	}

	App.initEvents();
}, false);