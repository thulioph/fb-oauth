'use strict';

import Facebook from './Facebook.js';
import FacebookURL from './FacebookURL.js';

// ====

const Handlebars = window.Handlebars;

const displayTemplate = (templateId, templateData, element) => {
	let template = Handlebars.compile(templateId);
	element.innerHTML = template(templateData);
};

// ====

if ('standalone' in navigator && navigator.standalone) {
	console.warn('Standalone mode..');
} else {
	console.warn('Another mode..');
}

let faceLogin = document.querySelector('#facebook-btn');

faceLogin.addEventListener('click', () => {
	// let fb = new Facebook();
	let fb = new FacebookURL();

	fb.login();
});

// ====

// Navigator
const templateScript = document.querySelector('#navigator').innerHTML;
const navigatorObj = window.navigator;
const output = document.querySelector('#output');

displayTemplate(templateScript, navigatorObj, output);

// Facebook
const fbTemplate = document.querySelector('#facebook').innerHTML;
const fbOutput = document.querySelector('#output-facebook');

// Token
const tokenTemplate = document.querySelector('#token').innerHTML;
const tokenOutput = document.querySelector('#output-token');

// ====

// class Facebook {
// 	constructor() {
// 		this.fb_provider = window.FB;
// 		this.scopes = ['public_profile', 'user_birthday'];
// 		this.fields = 'id,name,email,picture.height(320),birthday';
// 	}

// 	getStatus() {
// 		this.fb_provider
// 			.getLoginStatus(this._handleStatus.bind(this));
// 	}

// 	login() {
// 		this.fb_provider
// 			.login(this._handleLogin.bind(this), {
// 				scopes: 'public_profile,email'
// 			});
// 	}

// 	getUserData() {
// 		this.fb_provider
// 			.api(`/me?fields=${this.fields}`, this._handleApi.bind(this));
// 	}

// 	_handleStatus(res) {
// 		let data = res;

// 		switch (data.status) {
// 			case 'not_authorized':
// 				this.login();
// 				break;

// 			case 'connected':
// 				this.displayToken(data.authResponse);
// 				this.getUserData();
// 				break;
// 		}
// 	}

// 	_handleLogin(res) {
// 		if (res.status === 'not_authorized') {
// 			this._handleError(res.status);
// 		} else {
// 			this.displayToken(res);
// 			this.getUserData();
// 		}
// 	}

// 	_handleApi(res) {
// 		res.photo = res.picture.data.url;
// 		displayTemplate(fbTemplate, res, fbOutput);
// 	}

// 	_handleError(err) {
// 		throw new Error(`Error: ${err}`);
// 	}

// 	displayToken(obj) {
// 		// convert seconds to minutes
// 		obj.expiresIn = Math.floor(obj.expiresIn / 60);

// 		displayTemplate(tokenTemplate, obj, tokenOutput);
// 	}
// };

// class FacebookURL {
// 	constructor() {
// 		this.appId = '136721383558088';
// 		this.redirect_uri = window.location.href;
// 		this.login_url = `https://m.facebook.com/v2.3/dialog/oauth?client_id=${this.appId}&response_type=token,signed_request&redirect_uri=${this.redirect_uri}&scope=public_profile,email`;
// 	}

// 	login() {
//     window.open(this.login_url, '_blank');
// 	}

// 	checkUrl() {}
// };